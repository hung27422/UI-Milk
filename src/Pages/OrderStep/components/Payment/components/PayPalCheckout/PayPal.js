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
import useQueryInventories from "~/hooks/useQueryInventories";
import useQueryPoint from "~/hooks/useQueryPoint";

// This value is from the props in the UI
const style = { layout: "vertical" };
const CREATE_ORDER = gql`
  mutation CreateOrder($input: orderCreateOrderInput!) {
    createOrder(input: $input) {
      string
    }
  }
`;
const CREATE_ORDER_GUEST = gql`
  mutation CreateGuestOrder($input: orderCreateGuestOrderInput!) {
    createGuestOrder(input: $input) {
      string
    }
  }
`;
const ADD_POINT = gql`
  mutation AddPoint($input: userAddPointInput!) {
    addPoint(input: $input) {
      string
    }
  }
`;
const SUBTRACT_POINT = gql`
  mutation SubtractPoint($input: userSubtractPointInput!) {
    subtractPoint(input: $input) {
      string
    }
  }
`;
const UPDATE_DISCOUNT = gql`
  mutation UpdateDiscount($input: orderUpdateDiscountInput!) {
    updateDiscount(input: $input) {
      string
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
  refetch,
  setCartItem,
  discount,
  idPoint,
  totalPrice,
  dataPoint,
  refetchPoint,
  isCheckedPoint,
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
  const handleUpdateDiscount = async () => {
    const orderUpdateDiscountInput = {
      input: {
        activeDate: discount?.activeDate,
        amount: discount?.amount,
        code: discount?.code,
        description: discount?.description,
        expireDate: discount?.expireDate,
        id: discount?.id,
        quantity: discount?.quantity - 1,
        type: discount?.type,
      },
    };
    const result = await client.mutate({
      mutation: UPDATE_DISCOUNT,
      variables: {
        input: orderUpdateDiscountInput.input,
      },
    });
    console.log("Cập nhật quantity Discount thành công", result);
  };
  const handleAddPoint = async (total) => {
    const quantityPoint = total * (0.3 / 100);
    console.log("quantityPoint", quantityPoint);
    const userAddPointInput = {
      input: {
        input: {
          id: idPoint,
          point: quantityPoint,
        },
      },
    };
    const result = await client.mutate({
      mutation: ADD_POINT,
      variables: {
        input: userAddPointInput.input,
      },
    });
    console.log("ADD_POINT thành công,", result);
  };
  const handleSubtractPoint = async () => {
    const idPoint = dataPoint?.pointByUserId?.id;
    const point = dataPoint?.pointByUserId?.point;
    const userSubtractPointInput = {
      input: {
        input: {
          id: idPoint,
          point: point,
        },
      },
    };
    const result = await client.mutate({
      mutation: SUBTRACT_POINT,
      variables: {
        input: userSubtractPointInput.input,
      },
    });
    refetchPoint();
    console.log("SUBTRACT_POINT thành công,", result);
  };
  const handleCreateOrder = async () => {
    const apiTokenLocal = localStorage.getItem("apiToken");
    const userIdLocal = localStorage.getItem("userId");
    const total =
      data?.reduce((accumulator, item) => {
        return accumulator + (item?.price * item?.quantity || 0);
      }, 0) || 0;
    if (total >= 100000) {
      handleAddPoint(total);
    }
    if (isCheckedPoint) {
      handleSubtractPoint();
    }
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
      total: totalPrice,
      userId: userIdLocal,
      status: "CONFIRMED",
      phone: address?.phone,
      userName: address?.name,
      condition: {
        birthday: discount?.birthdayCondition,
        specialDay: discount?.specialDayCondition,
        total: discount?.totalOverCondition,
      },
      discountCode: discount?.code,
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
      setCartItem([]);
      console.log("Đã lưu đơn hàng:", result);
    } catch (error) {
      console.error("Lỗi khi lưu đơn hàng:", error);
    } finally {
      localStorage.setItem("cartItems", JSON.stringify([]));
      console.log("Đã xóa giỏ hàng");
      refetch();
      if (discount) {
        handleUpdateDiscount();
      }
    }
  };
  const handleCreateOrderGuest = async () => {
    const total =
      data?.reduce((accumulator, item) => {
        return accumulator + (item?.price * item?.quantity || 0);
      }, 0) || 0;

    const orderCreateGuestOrderInput = {
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
      condition: {
        birthday: discount?.birthdayCondition,
        specialDay: discount?.specialDayCondition,
        total: discount?.totalOverCondition,
      },
      discountCode: discount?.code,
    };

    try {
      const result = await client.mutate({
        mutation: CREATE_ORDER_GUEST,
        variables: {
          input: orderCreateGuestOrderInput,
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
      setCartItem([]);
      console.log("Đã tạo đơn hàng Guest:", result);
    } catch (error) {
      console.error("Lỗi khi tạo đơn hàng guest:", error);
    } finally {
      localStorage.setItem("cartItems", JSON.stringify([]));
      console.log("Đã xóa giỏ hàng");
      refetch();
      if (discount) {
        handleUpdateDiscount();
      }
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
              // handleDonePayment();
            }
          })
        }
      />
    </>
  );
};

export default function PayPal({ amount }) {
  const { refetch } = useQueryInventories();
  const { user, isAuthenticated } = useAuth0();
  const { data: dataAddress } = useQueryAddress();
  const [emailUser, setEmailUser] = useState(null);
  const [address, setAddress] = useState();
  const { discount } = useContext(MilkContext);
  const [setGuest] = useState();
  const { inventory } = useContext(MilkContext);
  const storedGuest = JSON.parse(localStorage.getItem("guest"));
  const { setCartItem } = useContext(MilkContext);
  const localStorageCart = JSON.parse(localStorage.getItem("cartItems"));
  const { data: dataPoint, refetch: refetchPoint } = useQueryPoint();

  useEffect(() => {
    if (dataPoint) {
      console.log("point nè", dataPoint?.pointByUserId?.id);
    }
  }, [dataPoint]);
  useEffect(() => {
    if (dataAddress && dataAddress.addresses.length > 0) {
      const defaultAddress = dataAddress.addresses.find(
        (item) => item.isDefault === true
      );
      setAddress(defaultAddress);
    }
  }, [address, dataAddress]);
  useEffect(() => {
    if (user && user.email) {
      setEmailUser(user.email);
      console.log("Email ở PayPal \n" + emailUser);
    } else if (storedGuest) {
      setGuest(storedGuest);
    }
  }, [emailUser, storedGuest, user]);
  const { isCheckedPoint, setIsCheckedPoint } = useContext(MilkContext);
  //total đơn hàng
  let total = 0;
  let totalPrice = 0;
  if (localStorageCart) {
    localStorageCart.forEach((item) => {
      total += item.total;
    });

    if (discount) {
      total -= discount.amount;
    }
    if (isCheckedPoint && dataPoint) {
      total -= dataPoint.pointByUserId.point;
    }

    // Ensure the total price is not negative
    totalPrice = Math.max(total, 0);
  }
  // ----------------------------------------
  const productOrder = [];
  if (Array.isArray(localStorageCart)) {
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
      {/* <PayPalScriptProvider
        options={{
          clientId: "test",
          components: "buttons",
          currency: "USD",
        }}
      > */}
      {emailUser || !isAuthenticated || storedGuest ? ( // Kiểm tra xem emailUser đã có giá trị
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
          refetch={refetch}
          setCartItem={setCartItem}
          discount={discount}
          idPoint={dataPoint?.pointByUserId?.id}
          totalPrice={totalPrice}
          dataPoint={dataPoint}
          refetchPoint={refetchPoint}
          isCheckedPoint={isCheckedPoint}
        />
      ) : (
        // hiển thị một spinner hoặc thông báo "Loading" ở đây
        <div>Loading...</div>
      )}
      {/* </PayPalScriptProvider> */}
    </div>
  );
}
