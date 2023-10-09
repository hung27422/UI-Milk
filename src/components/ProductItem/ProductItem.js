import classNames from "classnames/bind";
import styles from "./ProductItem.module.scss";
import Popper from "../Popper/Popper";
import configs from "~/configs";
import { NavLink } from "react-router-dom";

const cx = classNames.bind(styles);
function ProductItem({ hidden }) {
  const className = {
    hidden,
  };
  return (
    <NavLink to={configs.routes.detailproduct} className={cx("wrapper")}>
      <Popper>
        <div className={cx("header")}>
          <img
            className={cx("product-image")}
            src="https://hienthaoshop.com/wp-content/uploads/2020/06/uht-fresh-milk-sweetened-th-true-milk-box-of-1-liter.jpg"
            alt="milk"
          />
        </div>
        <div className={cx("container")}>
          <span className={cx("product-name")}>
            Sữa Tươi Tiệt Trùng Có Đường TH true MILK 1 L
          </span>
          <div className={cx("product-info", className)}>
            <div className={cx("product-price")}>
              <span className={cx("price-discount")}>12.000đ</span>
              <span className={cx("price-new")}>8.000 đ</span>
            </div>
          </div>
        </div>
      </Popper>
    </NavLink>
  );
}

export default ProductItem;
