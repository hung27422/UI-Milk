import classNames from "classnames/bind";
import styles from "../NameUserOrders.module.scss";
const cx = classNames.bind(styles);
function formatDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear());
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;
  return formattedDate;
}
function DateOrders({ data }) {
  const dateString = data?.date;
  const newDate = new Date(dateString);
  return (
    <div className={cx("wrapper")}>
      <span className={cx("quantity")}>{formatDate(newDate)}</span>
    </div>
  );
}

export default DateOrders;
