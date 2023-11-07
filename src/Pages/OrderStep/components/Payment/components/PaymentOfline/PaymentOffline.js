import classNames from "classnames/bind";
import styles from "./PaymentOffline.module.scss";
import PriceContent from "../PaymentOnline/PriceContent";
import ButtonPayment from "../ButtonPayment/ButtonPayment";
import { gql } from "@apollo/client";
import { client } from "~/ApolloClient";
import { useAuth0 } from "@auth0/auth0-react";

const cx = classNames.bind(styles);
const CREATE_ORDER = gql`
  mutation CreateOrder($input: orderCreateOrderInput!) {
    createOrder(input: $input) {
      orderCreatedPayload {
        message
      }
    }
  }
`;
function PaymentOffline() {
  const { user } = useAuth0();

  const localStorageCart = JSON.parse(localStorage.getItem("cartItems"));
  let total = 0;
  const handleCreateOrder = async () => {
    const apiTokenLocal = localStorage.getItem("apiToken");
    for (const item of localStorageCart) {
      const orderCreateOrderInput = {
        email: user?.email,
        items: [
          {
            name: item.name,
            price: item.price,
            productId: item.id,
            quantity: item.quantity,
            sku: item.sku,
          },
        ],
        shippingAddress: "HaNoi",
        total: (total += item.total),
        userId: "df5f68c5-ffa2-49f0-9537-984abed0f4e2",
        status: "CREATED",
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
  return (
    <div className={cx("wrapper")}>
      <div className={cx("content")}>
        <div className={cx("content-left")}>
          {localStorageCart.forEach((item) => {
            total = total + item.total;
          })}
          <PriceContent price={total} />
        </div>
        <div className={cx("content-right")}>
          <span className={cx("title")}>Thanh toán khi nhận hàng: </span>
          <span className={cx("description")}>
            Phí thu hộ: ₫0 VNĐ. Ưu đãi về phí vận chuyển (nếu có) áp dụng cả với
            phí thu hộ.
          </span>
        </div>
      </div>
      <div className={cx("btn-action")}>
        <ButtonPayment onClick={handleCreateOrder} />
      </div>
    </div>
  );
}

export default PaymentOffline;
