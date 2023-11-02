import classNames from "classnames/bind";
import styles from "./PaymentOnline.module.scss";
const cx = classNames.bind(styles);
function PriceContent({ price }) {
  return (
    <div className={cx("wrapper")}>
      <h2 className={cx("title-order")}>Order Summary</h2>
      <div className={cx("container-price")}>
        <span className={cx("number-price")}>
          Tổng tiền hàng: <span className={cx("price")}>{price} VNĐ</span>
        </span>
        <span className={cx("number-price")}>
          Phí vận chuyển: <span className={cx("price")}>0 VNĐ</span>
        </span>
      </div>
      <div className={cx("last-price")}>
        <span className={cx("total-price")}>
          Tông tiền: <span className={cx("price")}>{price} VNĐ</span>
        </span>
      </div>
    </div>
  );
}

export default PriceContent;
