import classNames from "classnames/bind";
import styles from "./MenuDetailOrder.module.scss";
const cx = classNames.bind(styles);
function MenuDetailOrder({ title, onClick, id, active }) {
  return (
    <div className={cx("wrapper")} onClick={onClick} id={id}>
      <div className={cx("box-menu", id === active ? "active" : "")}>
        <h3 className={cx("title")}>{title}</h3>
      </div>
    </div>
  );
}

export default MenuDetailOrder;
