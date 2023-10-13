import classNames from "classnames/bind";
import styles from "./OrderStepper.module.scss";
import OrderSteps from "~/components/OrderSteps";
import Cart from "./components/Cart";
const cx = classNames.bind(styles);
function OrderStepper() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <OrderSteps />
      </div>
      <div className={cx("cart")}>
        <Cart />
      </div>
    </div>
  );
}

export default OrderStepper;
