import classNames from "classnames/bind";
import styles from "./ItemCart.module.scss";
const cx = classNames.bind(styles);
function PriceProduct() {
  return (
    <div className={cx("wrapper")}>
      <span className={cx("price")}>8000 VNĐ</span>
    </div>
  );
}

export default PriceProduct;
