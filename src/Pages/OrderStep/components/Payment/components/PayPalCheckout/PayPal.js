import { gql, useApolloClient, useQuery } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useContext, useEffect } from "react";
import { client } from "~/ApolloClient";
import { MilkContext } from "~/components/ContextMilk/ContextMilk";

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
const ButtonWrapper = ({ showSpinner, currency, amount, data, user }) => {
  const [{ isPending, options }, dispatch] = usePayPalScriptReducer();
  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
      },
    });
    console.log("Chạy");
  }, [currency, showSpinner]);

  const handleCreateOrder = async (data, user) => {
    const apiTokenLocal = localStorage.getItem("apiToken");
    for (const item of data) {
      const orderCreateOrderInput = {
        email: "tanhungho2002@gmail.com",
        items: [
          {
            price: item.price,
            productId: item.productId,
            name: item.productName,
            quantity: item.quantity,
            sku: item.sku,
          },
        ],
        userId: "9e812fd4-7e8c-4f65-90c9-00853bfeade8",
        total: 100000,
        shippingAddress: "HCM",
      };

      try {
        const result = await client.mutate({
          mutation: CREATE_ORDER,
          context: {
            headers: {
              authorization: `Bearer ${apiTokenLocal}`,
            },
          },
          variables: { input: orderCreateOrderInput },
        });
        console.log("Đã lưu đơn hàng:", result);
      } catch (error) {
        console.error("Lỗi khi lưu đơn hàng:", error);
      }
    }
  };
  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[style]}
        fundingSource={undefined}
        onClick={() => handleCreateOrder(data, user)}
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
            // if (response.status === "COMPLETED") {
            //   handleSaveOrder(response);
            // }
          })
        }
      />
    </>
  );
};

export default function PayPal({ amount, payload }) {
  const { user } = useAuth0();
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
        <ButtonWrapper
          payload={payload}
          currency={"USD"}
          amount={amount}
          showSpinner={false}
          data={productOrder}
          user={user}
        />
      </PayPalScriptProvider>
    </div>
  );
}
