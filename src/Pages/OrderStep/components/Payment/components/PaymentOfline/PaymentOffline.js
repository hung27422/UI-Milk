import classNames from "classnames/bind";
import styles from "./PaymentOffline.module.scss";
import PriceContent from "../PaymentOnline/PriceContent";
import ButtonPayment from "../ButtonPayment/ButtonPayment";
const cx = classNames.bind(styles);
function PaymentOffline() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("content")}>
        <div className={cx("content-left")}>
          <PriceContent />
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
        <ButtonPayment />
      </div>
    </div>
  );
}

export default PaymentOffline;
