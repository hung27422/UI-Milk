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
  console.log("123", localStorageCart);
  let total = 0;
  const handleCreateOrder = async () => {
    const apiTokenLocal = localStorage.getItem("apiToken");
    const storedData = JSON.parse(localStorage.getItem("addressesData"));
    const userIdLocal = localStorage.getItem("userId");
    const orderCreateOrderInput = {
      email: user?.email,
      items: [
        ...localStorageCart.map((i) => ({
          name: i?.name,
          price: i?.price,
          productId: i?.id,
          quantity: i?.quantity,
          sku: i?.sku,
        })),
      ],
      shippingAddress: `${storedData[0].detail},${storedData[0].ward},${storedData[0].district},${storedData[0].city}`,
      total: 100,
      userId: userIdLocal,
      status: "CREATED",
      phone: storedData[0].phone,
      userName: storedData[0].name,
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
      localStorage.removeItem("cartItems");
    } catch (error) {
      console.error("Lỗi khi lưu đơn hàng:", error);
    } finally {
      //"Refetch"
      const updatedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      console.log("Đã xóa giỏ hàng");
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
