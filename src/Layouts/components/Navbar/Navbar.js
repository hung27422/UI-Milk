import classNames from "classnames/bind";
import styles from "./Navbar.module.scss";
import "tippy.js/dist/tippy.css";
import images from "~/assets/Images/Image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Search from "../Search/Search";
import { NavLink } from "react-router-dom";
import configs from "~/configs";
import LoginButton from "~/AuTh0/login";
import { useAuth0 } from "@auth0/auth0-react";
import AvatarUse from "~/components/AvatarUser/AvatarUse";
import { useContext, useEffect } from "react";
import { MilkContext } from "~/components/ContextMilk/ContextMilk";
const cx = classNames.bind(styles);

const Quantity = ({ children }) => {
  return <span className={cx("quantity")}>{children}</span>;
};
function Navbar() {
  const { countQuantity, setCountQuantity } = useContext(MilkContext);
  const { isAuthenticated } = useAuth0();
  const localStorageCart = JSON.parse(localStorage.getItem("cartItems"));
  const countQuantity1 = localStorageCart.reduce((total, product) => {
    return total + product.quantity;
  }, 0);
  useEffect(() => {
    setCountQuantity(countQuantity1);
  }, [countQuantity1, setCountQuantity]);
  return (
    <div className={cx("wrapper")}>
      <NavLink to={configs.routes.product} className={cx("logo")}>
        <img src={images.logo} alt="" className={cx("img-logo")} />
      </NavLink>
      <Search />
      <div className={cx("btn-action")}>
        <NavLink to={configs.routes.orderstepper} className={cx("icon-action")}>
          <FontAwesomeIcon className={cx("btn-icon")} icon={faCartShopping} />
          <Quantity>{countQuantity}</Quantity>
        </NavLink>
        <div className={cx("icon-action")}>
          <FontAwesomeIcon className={cx("btn-icon")} icon={faBell} />
          <Quantity>0</Quantity>
        </div>
        {!isAuthenticated ? <LoginButton /> : <AvatarUse />}
      </div>
    </div>
  );
}

export default Navbar;
