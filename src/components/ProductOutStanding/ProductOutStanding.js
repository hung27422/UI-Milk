import classNames from "classnames/bind";
import styles from "./ProductOutStanding.module.scss";

import ProductItem from "../ProductItem/ProductItem";
const cx = classNames.bind(styles);
function ProductOutStanding() {
  return (
    <div className={cx("wrapper")}>
      <h2 className={cx("title")}>Sản phẩm nổi bật</h2>
      <div className={cx("list-product")}>
        <ProductItem hidden />
        <ProductItem hidden />
        <ProductItem hidden />
        <ProductItem hidden />
        <ProductItem hidden />
      </div>
    </div>
  );
}

export default ProductOutStanding;
