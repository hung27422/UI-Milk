import classNames from "classnames/bind";
import styles from "./SliderItem.module.scss";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const cx = classNames.bind(styles);
function SliderItem() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    <Slider {...settings} className={cx("wrapper")}>
      <div className={cx("slider-item")}>
        <img
          src="https://www.thmilk.vn/wp-content/uploads/2023/08/Banner-all-1.jpg"
          alt=""
        />
      </div>
      <div className={cx("slider-item")}>
        <img
          src="https://www.thmilk.vn/wp-content/uploads/2023/08/1170x660.png"
          alt=""
        />
      </div>
      <div className={cx("slider-item")}>
        <img
          src="https://www.thmilk.vn/wp-content/uploads/2023/05/Main-menu_1-min.png"
          alt=""
        />
      </div>
      <div className={cx("slider-item")}>
        <img
          src="https://www.thmilk.vn/wp-content/uploads/2023/07/SMC_1170x660px.jpg"
          alt=""
        />
      </div>
    </Slider>
  );
}

export default SliderItem;
