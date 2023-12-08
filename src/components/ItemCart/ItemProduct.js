import classNames from "classnames/bind";
import styles from "./ItemCart.module.scss";
const cx = classNames.bind(styles);
function ItemProduct({ data }) {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("image")}>
        <img className={cx("img-product")} src={data?.images} alt="" />
      </div>
      <div className={cx("info-product")}>
        <span className={cx("name-product")}>{data?.name}</span>
      </div>
    </div>
  );
}

export default ItemProduct;
