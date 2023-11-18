import classNames from "classnames/bind";
import styles from "../NameUserOrders.module.scss";
const cx = classNames.bind(styles);
function PhoneUserOrders({ data }) {
  return (
    <div className={cx("wrapper")}>
      <span className={cx("price")}>{data?.phone}</span>
    </div>
  );
}

export default PhoneUserOrders;
