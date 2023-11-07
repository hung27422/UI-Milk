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
const ButtonWrapper = ({ showSpinner, currency, amount, data, emailUser }) => {
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
    console.log("Email ở Button: " + emailUser);
    let total = 0;
    for (const item of data) {
      const orderCreateOrderInput = {
        email: emailUser,
        items: [
          {
            name: item.productName,
            price: item.price,
            productId: item.productId,
            quantity: item.quantity,
            sku: item.sku,
          },
        ],
        shippingAddress: "HaNoi",
        total: (total += item.total),
        userId: "df5f68c5-ffa2-49f0-9537-984abed0f4e2",
        status: "CONFIRMED",
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
              // handleDonePayment();
            }
          })
        }
      />
    </>
  );
};

export default function PayPal({ amount }) {
  const { user } = useAuth0();

  const [emailUser, setEmailUser] = useState(null);
  useEffect(() => {
    if (user && user.email) {
      setEmailUser(user.email);
      console.log("Email ở PayPal \n" + emailUser);
    }
  }, [emailUser, user]);
  const { cartItem } = useContext(MilkContext);
  const localStorageCart = JSON.parse(localStorage.getItem("cartItems"));
  console.log("123", localStorageCart);
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
        {emailUser !== null ? ( // Kiểm tra xem emailUser đã có giá trị
          <ButtonWrapper
            currency={"USD"}
            amount={amount}
            showSpinner={false}
            data={productOrder}
            emailUser={emailUser}
          />
        ) : (
          // hiển thị một spinner hoặc thông báo "Loading" ở đây
          <div>Loading...</div>
        )}
      </PayPalScriptProvider>
    </div>
  );
}
