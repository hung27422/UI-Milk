import classNames from "classnames/bind";
import styles from "./HomePage.module.scss";
import SliderItem from "~/components/SliderItem/SliderItem";
import ProductOutStanding from "~/components/ProductOutStanding";
import ProductAdvertisement from "~/components/ProductAdvertisement";
const cx = classNames.bind(styles);
function Product() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("slider")}>
        <SliderItem />
      </div>
      <div className={cx("product-outstanding")}>
        <ProductOutStanding />
      </div>
      <div className={cx("product-advertisement")}>
        <ProductAdvertisement />
      </div>
    </div>
  );
}

export default Product;
