import classNames from "classnames/bind";
import styles from "./PaymentOnline.module.scss";
import PriceContent from "./PriceContent";
import { useContext, useEffect, useState } from "react";
import PayPal from "../PayPalCheckout/PayPal";
import { MilkContext } from "~/components/ContextMilk/ContextMilk";
import useQueryPoint from "~/hooks/useQueryPoint";

const cx = classNames.bind(styles);
function PaymentOnline() {
  const localStorageCart = JSON.parse(localStorage.getItem("cartItems"));
  const [showPayment, setShowPayment] = useState(false);
  const { discount } = useContext(MilkContext);
  const { isCheckedPoint, setIsCheckedPoint } = useContext(MilkContext);
  const { data: dataPoint } = useQueryPoint();
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
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPayment(true);
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("payment-online")}>
        <div className={cx("content-left")}>
          <h2 className={cx("title-payment")}>Thông tin thanh toán</h2>
          {showPayment && (
            <div style={{ width: "300px", height: "40px" }}>
              <PayPal amount={totalPrice} />
            </div>
          )}
        </div>
        <div className={cx("content-right")}>
          <PriceContent price={totalPrice} />
        </div>
      </div>
    </div>
  );
}

export default PaymentOnline;
