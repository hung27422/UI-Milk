import classNames from "classnames/bind";
import styles from "../NameUserOrders.module.scss";
const cx = classNames.bind(styles);
function NameUserOrders({ data }) {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("info-product")}>
        <span className={cx("name-product")}>{data?.id}</span>
      </div>
    </div>
  );
}

export default NameUserOrders;
