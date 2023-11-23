import classNames from "classnames/bind";
import styles from "./PaymentOffline.module.scss";
import PriceContent from "../PaymentOnline/PriceContent";
import ButtonPayment from "../ButtonPayment/ButtonPayment";
import { gql } from "@apollo/client";
import { client } from "~/ApolloClient";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import { MilkContext } from "~/components/ContextMilk/ContextMilk";

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
  const { user, isAuthenticated } = useAuth0();
  const { guest, setGuest } = useContext(MilkContext);
  const localStorageCart = JSON.parse(localStorage.getItem("cartItems"));
  console.log("123", localStorageCart);
  let total = 0;
  const handleCreateOrder = async () => {
    const apiTokenLocal = localStorage.getItem("apiToken");
    const storedData = JSON.parse(localStorage.getItem("addressesData"));
    const userIdLocal = localStorage.getItem("userId");
    let total = 0;
    localStorageCart.forEach((item) => {
      total = item?.price * item?.quantity;
    });
    console.log(total);
    const orderCreateOrderInput = {
      email: isAuthenticated ? user?.email : guest?.emailGuest,
      items: [
        ...localStorageCart.map((i) => ({
          name: i?.name,
          price: i?.price,
          productId: i?.id,
          quantity: i?.quantity,
          sku: i?.sku,
        })),
      ],
      shippingAddress: isAuthenticated
        ? `${storedData[0].detail},${storedData[0].ward},${storedData[0].district},${storedData[0].city}`
        : guest?.addressGuest,
      total: total,
      userId: userIdLocal,
      status: "CREATED",
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
      setGuest({});
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
