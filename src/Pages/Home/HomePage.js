import classNames from "classnames/bind";
import styles from "./HomePage.module.scss";
import SliderItem from "~/components/SliderItem/SliderItem";
import ProductOutStanding from "~/components/ProductOutStanding";
import ProductAdvertisement from "~/components/ProductAdvertisement";
import PointToGift from "~/components/PointToGift";
import Footer from "~/Layouts/components/Footer/Footer";
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
      <div className={cx("point-gift")}>
        <PointToGift />
      </div>
      <div className={cx("product-advertisement")}>
        <ProductAdvertisement />
      </div>
      <div className={cx("footer")}>
        <Footer />
      </div>
    </div>
  );
}

export default Product;
