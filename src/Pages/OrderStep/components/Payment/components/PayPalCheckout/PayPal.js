import { gql, useApolloClient, useQuery } from "@apollo/client";
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
// Custom component to wrap the PayPalButtons and show loading spinner
const ButtonWrapper = ({
  showSpinner,
  currency,
  amount,
  data,
  emailUser,
  guest,
  isAuthenticated,
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
    const apiTokenLocal = localStorage.getItem("apiToken");
    const userIdLocal = localStorage.getItem("userId");
    const storedData = JSON.parse(localStorage.getItem("addressesData"));

    console.log("Email ở Button: " + emailUser);
    let total = 0;
    data.forEach((item) => {
      total += item.total;
    });
    const orderCreateOrderInput = {
      email: isAuthenticated ? emailUser : guest?.emailGuest,
      items: [
        ...data.map((i) => ({
          name: i?.productName,
          price: i?.price,
          productId: i?.productId,
          quantity: i?.quantity,
          sku: i?.sku,
        })),
      ],
      shippingAddress: isAuthenticated
        ? `${storedData[0].detail},${storedData[0].ward},${storedData[0].district},${storedData[0].city}`
        : guest?.addressGuest,
      total: total,
      userId: userIdLocal,
      status: "CONFIRMED",
      phone: isAuthenticated ? storedData[0].phone : guest?.phoneGuest,
      userName: isAuthenticated ? storedData[0].name : guest?.nameGuest,
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
      console.log("Đã lưu đơn hàng:", result);
    } catch (error) {
      console.error("Lỗi khi lưu đơn hàng:", error);
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
        // onClick={handleCreateOrder}
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
              handleCreateOrder();
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
  const [emailUser, setEmailUser] = useState(null);
  const [guest, setGuest] = useState();
  const storedGuest = JSON.parse(localStorage.getItem("guest"));

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
    // Xử lý trường hợp `cartItem` không phải là mảng
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
          />
        ) : (
          // hiển thị một spinner hoặc thông báo "Loading" ở đây
          <div>Loading...</div>
        )}
      </PayPalScriptProvider>
    </div>
  );
}
