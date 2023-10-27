import classNames from "classnames/bind";
import styles from "./ItemCart.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect } from "react";
import { MilkContext } from "../ContextMilk/ContextMilk";
const cx = classNames.bind(styles);
function DeleteProduct({ data }) {
  const { cartItem, setCartItem } = useContext(MilkContext);

  const handleDeleteItemCart = () => {
    const itemIdToDelete = data.id;
    const updatedCart = cartItem.filter((item) => item.id !== itemIdToDelete);
    setCartItem(updatedCart);
  };
  return (
    <div className={cx("wrapper")} onClick={handleDeleteItemCart}>
      <FontAwesomeIcon className={cx("delete-icon")} icon={faTrash} />
    </div>
  );
}

export default DeleteProduct;
