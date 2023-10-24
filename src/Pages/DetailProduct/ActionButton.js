import classNames from "classnames/bind";
import styles from "./Detail.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faShop } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { MilkContext } from "~/components/ContextMilk/ContextMilk";
import { gql, useQuery } from "@apollo/client";
const cx = classNames.bind(styles);

function ActionButton({ product }) {
  const { setCartItem, showTotal, setShowTotal } = useContext(MilkContext);
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(product.price);

  const handleAddToCart = () => {
    setCartItem((cartItem) => [
      ...cartItem,
      {
        ...product,
        quantity,
        total,
      },
    ]);
  };

  const handleQuantityMinus = () => {
    if (quantity <= 1) {
      return;
    }
    setQuantity(quantity - 1);
    setTotal(total - product.price);
  };

  const handleQuantityAdd = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    setTotal(product.price * newQuantity);
    setShowTotal(true);
  };

  return (
    <div className={cx("action-btn")}>
      <div className={cx("select-quantity")}>
        <button className={cx("btn-minus")} onClick={handleQuantityMinus}>
          -
        </button>
        <span className={cx("current-quantity")}>{quantity}</span>
        <button className={cx("btn-add")} onClick={handleQuantityAdd}>
          +
        </button>
      </div>
      <div className={cx("btn-buy")}>
        <FontAwesomeIcon className={cx("icon-buy")} icon={faShop} />
        <span>Mua hàng</span>
      </div>
      <div className={cx("btn-add__cart")} onClick={handleAddToCart}>
        <FontAwesomeIcon className={cx("icon-cart")} icon={faCartPlus} />
        <span>Thêm giỏ hàng</span>
      </div>
    </div>
  );
}

export default ActionButton;
