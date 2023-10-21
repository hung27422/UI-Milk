import classNames from "classnames/bind";
import styles from "./MenuItem.module.scss";
import { NavLink } from "react-router-dom";

const cx = classNames.bind(styles);
function MenuItem({ title, to, icon, onClick, logOut }) {
  return (
    <NavLink
      to={to}
      icon={icon}
      onClick={onClick}
      className={(nav) => cx("menu-item", !logOut && { active: nav.isActive })}
    >
      <div className={cx("wrapper")}>
        <span className={cx("menu-icon")}>{icon}</span>
        <span className={cx("title")}>{title}</span>
      </div>
    </NavLink>
  );
}

export default MenuItem;
