import classNames from "classnames/bind";
import styles from "./Detail.module.scss";
const cx = classNames.bind(styles);

function ProductIngredient() {
  return (
    <div className={cx("product-ingredient")}>
      <h3 className={cx("title")}>Thành phần dinh dưỡng</h3>
      <span className={cx("ingredient")}>Năng lượng: 73.2 kcal</span>
      <span className={cx("ingredient")}>Chất béo: 3,2 g</span>
      <span className={cx("ingredient")}>Chất đạm: 2,9 g</span>
      <span className={cx("ingredient")}>Hydrat cacbon: 8,2 g</span>
      <span className={cx("ingredient")}>Canxi: 100 mg</span>
      <span className={cx("ingredient")}>
        Các vitamin và khoáng chất có sẵn trong sữa tươi
      </span>
    </div>
  );
}
export default ProductIngredient;
