import classNames from "classnames/bind";
import styles from "./Detail.module.scss";
const cx = classNames.bind(styles);

function DescriptionProduct() {
  return (
    <div className={cx("product-description")}>
      <span className={cx("description")}>
        - Hoàn toàn từ sữa tươi sạch nguyên chất của Trang trại TH
      </span>
      <span className={cx("description")}>
        - Được sản xuất theo một quy trình sạch, khép kín từ đồng cỏ đến bàn ăn
      </span>
      <span className={cx("description")}>- Không sử dụng chất bảo quản</span>
    </div>
  );
}
export default DescriptionProduct;
