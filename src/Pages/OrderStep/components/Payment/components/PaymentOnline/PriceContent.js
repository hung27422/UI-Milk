import classNames from "classnames/bind";
import styles from "./PaymentOnline.module.scss";
import Button from "~/components/Button";
const cx = classNames.bind(styles);
function PriceContent() {
  return (
    <div className={cx("wrapper")}>
      <h2 className={cx("title-order")}>Order Summary</h2>
      <div className={cx("container-price")}>
        <span className={cx("number-price")}>
          Tổng tiền hàng: <span className={cx("price")}>24000 VNĐ</span>
        </span>
        <span className={cx("number-price")}>
          Phí vận chuyển: <span className={cx("price")}>2000 VNĐ</span>
        </span>
      </div>
      <div className={cx("last-price")}>
        <span className={cx("total-price")}>
          Tông tiền: <span className={cx("price")}>26000 VNĐ</span>
        </span>
      </div>
      
    </div>
  );
}

export default PriceContent;
