import { AddModerator } from "@mui/icons-material";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";

// This value is from the props in the UI
const style = { layout: "vertical" };

function createOrder() {
  // replace this url with your server
  return fetch("http://localhost:3000/payment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      cart: [
        {
          sku: "1241241",
          quantity: 3,
        },
      ],
    }),
  })
    .then((response) => response.json())
    .then((order) => {
      return order.id;
    });
}

function onApprove(data) {
  // replace this url with your server
  return fetch("http://localhost:3000/payment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      orderID: data.orderID,
    }),
  })
    .then((response) => response.json())
    .then((orderData) => {
      // console.log("Đặt hàng thành công", orderData);
    });
}

// Custom component to wrap the PayPalButtons and show loading spinner
const ButtonWrapper = ({ showSpinner }) => {
  const [{ isPending }] = usePayPalScriptReducer();
  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[style]}
        fundingSource={undefined}
        createOrder={createOrder}
        onApprove={onApprove}
      />
    </>
  );
};

export default function PayPal() {
  return (
    <div style={{ maxWidth: "750px", minHeight: "200px" }}>
      <PayPalScriptProvider
        options={{
          clientId:
            "AVPNzNkEKVMkLGJfMHS9ggnnFzIhfj7PgSgc9Pk78_oWWBPAaN3_vcJ3-uSB0X2R6faE5KTJtTkeo2rP",
          components: "buttons",
          currency: "USD",
        }}
      >
        <ButtonWrapper showSpinner={false} />
      </PayPalScriptProvider>
    </div>
  );
}
