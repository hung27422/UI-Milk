import classNames from "classnames/bind";
import styles from "./Detail.module.scss";
const cx = classNames.bind(styles);

function InfoProduct({ product }) {
  return (
    <>
      <span className={cx("product-name")}>{product.name}</span>
      <span className={cx("product-price")}>Giá: {product.price} đ/hộp</span>
    </>
  );
}

export default InfoProduct;
