import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useContext, useEffect, useState } from "react";
import { client } from "~/ApolloClient";
import { MilkContext } from "~/components/ContextMilk/ContextMilk";
import configs from "~/configs";
import useQueryAddress from "~/hooks/useQueryAddress";

// This value is from the props in the UI
const style = { layout: "vertical" };
const CREATE_ORDER = gql`
  mutation CreateOrder($input: orderCreateOrderInput!) {
    createOrder(input: $input) {
      orderCreatedPayload {
        message
      }
    }
  }
`;
const CREATE_ORDER_GUEST = gql`
  mutation CreateGuestOrder($input: orderCreateGuestOrderInput!) {
    createGuestOrder(input: $input) {
      orderCreatedPayload {
        message
      }
    }
  }
`;
const ButtonWrapper = ({
  showSpinner,
  currency,
  amount,
  data,
  emailUser,
  guest,
  isAuthenticated,
  inventory,
  address,
}) => {
  const [{ isPending, options }, dispatch] = usePayPalScriptReducer();
  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
      },
    });
  }, [currency, showSpinner]);
  const handleCreateOrder = async () => {
    console.log(address);
    const apiTokenLocal = localStorage.getItem("apiToken");
    const userIdLocal = localStorage.getItem("userId");
    console.log("Inventory paypal", inventory);
    console.log("Email ở Button: " + emailUser);
    const total =
      data?.reduce((accumulator, item) => {
        return accumulator + (item?.price * item?.quantity || 0);
      }, 0) || 0;
    console.log(total);
    const orderCreateOrderInput = {
      email: emailUser,
      items: [
        ...data.map((i) => ({
          name: i?.productName,
          price: i?.price,
          productId: i?.productId,
          quantity: i?.quantity,
          sku: i?.sku,
        })),
      ],
      shippingAddress: `${address?.detail},${address?.ward},${address?.district},${address?.city}`,
      total: total,
      userId: userIdLocal,
      status: "CONFIRMED",
      phone: address?.phone,
      userName: address?.name,
    };

    try {
      const result = await client.mutate({
        mutation: CREATE_ORDER,
        context: {
          headers: {
            authorization: `Bearer ${apiTokenLocal}`,
          },
        },
        variables: {
          input: orderCreateOrderInput,
        },
      });
      data?.forEach((item) => {
        const inventoryItem = inventory?.find(
          (inventory) => inventory.id === item.idInventory
        );
        if (inventoryItem) {
          const updatedQuantity = inventoryItem.quantity - item.quantity;
          inventoryItem.quantity = updatedQuantity;
        }
      });
      console.log("Đã lưu đơn hàng:", result);
    } catch (error) {
      console.error("Lỗi khi lưu đơn hàng:", error);
    }
  };
  const handleCreateOrderGuest = async () => {
    let total = 0;
    data.forEach((item) => {
      total += item.total;
    });
    const orderCreateOrderInput = {
      email: guest?.emailGuest,
      items: [
        ...data.map((i) => ({
          name: i?.productName,
          price: i?.price,
          productId: i?.productId,
          quantity: i?.quantity,
          sku: i?.sku,
        })),
      ],
      shippingAddress: guest?.addressGuest,
      total: total,
      status: "CONFIRMED",
      phone: guest?.phoneGuest,
      userName: guest?.nameGuest,
    };

    try {
      const result = await client.mutate({
        mutation: CREATE_ORDER_GUEST,
        variables: {
          input: orderCreateOrderInput,
        },
      });
      data?.forEach((item) => {
        const inventoryItem = inventory?.find(
          (inventory) => inventory.id === item.idInventory
        );
        if (inventoryItem) {
          const updatedQuantity = inventoryItem.quantity - item.quantity;
          inventoryItem.quantity = updatedQuantity;
        }
      });
      console.log("Đã tạo đơn hàng Guest:", result);
    } catch (error) {
      console.error("Lỗi khi tạo đơn hàng guest:", error);
    }
  };
  const { setActiveStep } = useContext(MilkContext);
  const handleDonePayment = () => {
    setActiveStep(3);
    window.location.href = `${configs.routes.orderdone}`;
  };
  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[style]}
        fundingSource={undefined}
        createOrder={(data, actions) => {
          return actions.order
            .create({
              purchase_units: [
                { amount: { currency_code: currency, value: amount } },
              ],
            })
            .then((orderId) => orderId);
        }}
        onApprove={(data, actions) =>
          actions.order.capture().then(async (response) => {
            console.log(response);
            if (response.status === "COMPLETED") {
              if (isAuthenticated) {
                handleCreateOrder();
              } else if (!isAuthenticated) {
                handleCreateOrderGuest();
              }
              handleDonePayment();
            }
          })
        }
      />
    </>
  );
};

export default function PayPal({ amount }) {
  const { user, isAuthenticated } = useAuth0();
  const { data: dataAddress } = useQueryAddress();
  const [emailUser, setEmailUser] = useState(null);
  const [address, setAddress] = useState();
  const [guest, setGuest] = useState();
  const { inventory } = useContext(MilkContext);
  const storedGuest = JSON.parse(localStorage.getItem("guest"));
  useEffect(() => {
    if (dataAddress && dataAddress.addresses.length > 0) {
      const defaultAddress = dataAddress.addresses.find(
        (item) => item.isDefault === true
      );
      setAddress(defaultAddress);
    }
    // console.log("ấdaa", address);
  }, [address, dataAddress]);
  useEffect(() => {
    if (user && user.email) {
      setEmailUser(user.email);
      console.log("Email ở PayPal \n" + emailUser);
    } else if (storedGuest) {
      setGuest(storedGuest);
    }
  }, [emailUser, user]);
  const { cartItem } = useContext(MilkContext);
  const localStorageCart = JSON.parse(localStorage.getItem("cartItems"));
  const productOrder = [];
  if (Array.isArray(cartItem)) {
    localStorageCart.forEach((item) => {
      const productInfo = {
        productId: item.id,
        productName: item.name,
        quantity: item.quantity,
        price: item.price,
        sku: item.sku,
        total: item.total,
      };
      productOrder.push(productInfo);
    });
  } else {
    console.error("cartItem is not an array");
  }

  return (
    <div style={{ maxWidth: "100px", minHeight: "50px" }}>
      <PayPalScriptProvider
        options={{
          clientId: "test",
          components: "buttons",
          currency: "USD",
        }}
      >
        {emailUser || guest ? ( // Kiểm tra xem emailUser đã có giá trị
          <ButtonWrapper
            currency={"USD"}
            amount={amount}
            showSpinner={false}
            data={productOrder}
            emailUser={emailUser}
            guest={storedGuest}
            isAuthenticated={isAuthenticated}
            inventory={inventory}
            address={address}
          />
        ) : (
          // hiển thị một spinner hoặc thông báo "Loading" ở đây
          <div>Loading...</div>
        )}
      </PayPalScriptProvider>
    </div>
  );
}
