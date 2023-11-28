import classNames from "classnames/bind";
import styles from "./ItemCart.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect } from "react";
import { MilkContext } from "../ContextMilk/ContextMilk";
const cx = classNames.bind(styles);
function DeleteProduct({ data }) {
  const { setCartItem } = useContext(MilkContext);

  const handleDeleteItemCart = () => {
    const itemIdToDelete = data.id;
    const localStorageCart = JSON.parse(localStorage.getItem("cartItems"));
    const updatedCart = localStorageCart.filter(
      (item) => item.id !== itemIdToDelete
    );
    setCartItem(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };
  return (
    <div className={cx("wrapper")} onClick={handleDeleteItemCart}>
      <FontAwesomeIcon className={cx("delete-icon")} icon={faTrash} />
    </div>
  );
}

export default DeleteProduct;
