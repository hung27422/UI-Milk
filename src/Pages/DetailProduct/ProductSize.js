import classNames from "classnames/bind";
import styles from "./Detail.module.scss";
const cx = classNames.bind(styles);
function ProductSize() {
  return (
    <div className="product-size">
      <span className={cx("title-size")}>Size: </span>
      <label className={cx("form-size")}>
        <input type="radio" name="hộp" value="" />
        <span className={cx("name-size")}>Hộp</span>
      </label>
      <label className={cx("form-size")}>
        <input type="radio" name="lốc" value="" />
        <span className={cx("name-size")}>Lốc ( 4 hộp )</span>
      </label>
      <label className={cx("form-size")}>
        <input type="radio" name="thùng" value="" />
        <span className={cx("name-size")}>Thùng (24 hộp)</span>
      </label>
    </div>
  );
}

export default ProductSize;
