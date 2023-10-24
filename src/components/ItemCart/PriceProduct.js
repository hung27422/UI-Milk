import classNames from "classnames/bind";
import styles from "./ItemCart.module.scss";
const cx = classNames.bind(styles);
function PriceProduct({ data }) {
  return (
    <div className={cx("wrapper")}>
      <span className={cx("price")}>{data?.price}</span>
    </div>
  );
}

export default PriceProduct;
