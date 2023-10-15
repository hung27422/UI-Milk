import classNames from "classnames/bind";
import styles from "./Payment.module.scss";
import OrderSteps from "~/components/OrderSteps";
import Button from "~/components/Button";
import PaymentOnline from "./components/PaymentOnline/PaymentOnline";
import { useState } from "react";
const cx = classNames.bind(styles);

const MethodPayment = ({ children, handleChoosePayment, id, activeID }) => {
  return (
    <div className={cx("method-payment")}>
      <Button
        id={id}
        onClick={() => handleChoosePayment(id)}
        className={cx("name-method", id === activeID ? "active" : "")}
      >
        {children}
      </Button>
    </div>
  );
};

function Payment() {
  const [activeID, setActiveID] = useState(1);
  const handleChoosePayment = (id) => {
    setActiveID(id);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <OrderSteps />
      </div>
      <div className={cx("container")}>
        <div className={cx("body")}>
          <h2 className={cx("title")}>Phương thức thanh toán: </h2>
          <MethodPayment
            id={1}
            activeID={activeID}
            handleChoosePayment={handleChoosePayment}
          >
            Thẻ tín dụng
          </MethodPayment>
          <MethodPayment
            id={2}
            activeID={activeID}
            handleChoosePayment={handleChoosePayment}
          >
            Thanh toán khi nhận hàng
          </MethodPayment>
        </div>
        <div className={cx("content")}>
          {activeID === 1 && <PaymentOnline />}
          {activeID === 2 && (
            <>
              <h2>Thanh toán khi nhận hàng</h2>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Payment;
