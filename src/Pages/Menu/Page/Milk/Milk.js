import classNames from "classnames/bind";
import styles from "./Milk.module.scss";
import ProductItem from "~/components/ProductItem/ProductItem";

const cx = classNames.bind(styles);

function Milk() {
  return (
    <div className={cx("wrapper")}>
      <ProductItem />
      <ProductItem />
      <ProductItem />
      <ProductItem />
      <ProductItem />
      <ProductItem />
      <ProductItem />
      <ProductItem />
      <ProductItem />
      <ProductItem />
      <ProductItem />
      <ProductItem />
    </div>
  );
}

export default Milk;
