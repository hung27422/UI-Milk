import classNames from "classnames/bind";
import styles from "./ItemCart.module.scss";
const cx = classNames.bind(styles);
function ItemProduct() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("image")}>
        <img
          className={cx("img-product")}
          src="https://www.thmilk.vn/wp-content/uploads/2019/11/UHT-180-ID-457x396.png"
          alt=""
        />
      </div>
      <div className={cx("info-product")}>
        <span className={cx("name-product")}>Sữa tươi tiệc trùng</span>
        <div className={cx("des-product")}>
          <span className={cx("size")}>
            Size: <span className={cx("size-select")}>L</span>
          </span>
          <span className={cx("capacity")}>
            Dung tích: <span className={cx("capacity-select")}>180ml</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default ItemProduct;
