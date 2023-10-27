import classNames from "classnames/bind";
import styles from "./PaymentOnline.module.scss";
import PriceContent from "./PriceContent";
import CardContent from "./CardContent";
import ButtonPayment from "../ButtonPayment/ButtonPayment";
import PayPal from "~/Pages/OrderStep/components/Payment/components/PayPalCheckout/PayPal";
import { useContext } from "react";
import { MilkContext } from "~/components/ContextMilk/ContextMilk";

const cx = classNames.bind(styles);
function PaymentOnline() {
  const { cartItem } = useContext(MilkContext);
  let total = 0;

  return (
    <div className={cx("wrapper")}>
      <div className={cx("payment-online")}>
        <div className={cx("content-left")}>
          <CardContent />
        </div>
        <div className={cx("content-right")}>
          <PriceContent />
        </div>
      </div>
      <div style={{ width: "200px", height: "40px" }}>
        {cartItem.forEach((item) => {
          total = total + item.total;
        })}
        <PayPal amount={total} />
      </div>
      <div className={cx("btn-action")}>
        <ButtonPayment />
      </div>
    </div>
  );
}

export default PaymentOnline;
