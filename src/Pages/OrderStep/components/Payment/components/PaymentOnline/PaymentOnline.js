import classNames from "classnames/bind";
import styles from "./PaymentOnline.module.scss";
import PriceContent from "./PriceContent";
import CardContent from "./CardContent";

const cx = classNames.bind(styles);
function PaymentOnline() {
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
    </div>
  );
}

export default PaymentOnline;
