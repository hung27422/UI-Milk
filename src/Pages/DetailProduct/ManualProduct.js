import classNames from "classnames/bind";
import styles from "./Detail.module.scss";
const cx = classNames.bind(styles);

function ManualProduct() {
  return (
    <div className={cx("product-manual")}>
      <h3 className={cx("title")}>Hướng dẫn sử dụng và bảo quản</h3>
      <span className={cx("manual")}>Bảo quản nơi khô ráo và thoáng mát. </span>
      <span className={cx("manual")}>Sử dụng ngay sau khi mở. </span>
      <span className={cx("manual")}>
        Ngon hơn khi uống lạnh. Sản phẩm có chứa sữa.{" "}
      </span>
      <span className={cx("manual")}>HSD: 180 ngày kể từ ngày sản xuất</span>
    </div>
  );
}

export default ManualProduct;
