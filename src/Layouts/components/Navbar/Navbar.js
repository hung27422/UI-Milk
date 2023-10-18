import classNames from "classnames/bind";
import styles from "./Navbar.module.scss";
import images from "~/assets/Images/Image";
import Button from "~/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useState, useContext } from "react";
import Search from "../Search/Search";
import { MilkContext } from "~/components/ContextMilk/ContextMilk";
import { NavLink } from "react-router-dom";
import configs from "~/configs";
const cx = classNames.bind(styles);

const Quantity = ({ children }) => {
  return <span className={cx("quantity")}>{children}</span>;
};
function Navbar() {
  const { currentUser } = useContext(MilkContext);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("logo")}>
        <img src={images.logo} alt="" className={cx("img-logo")} />
      </div>
      <Search />
      <div className={cx("btn-action")}>
        <NavLink to={configs.routes.orderstepper} className={cx("icon-action")}>
          <FontAwesomeIcon className={cx("btn-icon")} icon={faCartShopping} />
          <Quantity>6</Quantity>
        </NavLink>
        <div className={cx("icon-action")}>
          <FontAwesomeIcon className={cx("btn-icon")} icon={faBell} />
          <Quantity>3</Quantity>
        </div>
        {!currentUser ? (
          <Button primary>Login</Button>
        ) : (
          <img
            className={cx("avatar")}
            src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
            alt="avatar"
          />
        )}
      </div>
    </div>
  );
}

export default Navbar;
