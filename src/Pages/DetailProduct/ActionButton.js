import classNames from "classnames/bind";
import styles from "./Detail.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faShop } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { MilkContext } from "~/components/ContextMilk/ContextMilk";
import ModalSuccessAddCart from "~/components/ModalSuccessAddCart/ModalSuccessAddCart";
const cx = classNames.bind(styles);

function ActionButton({ product }) {
  const { setCartItem, setShowTotal } = useContext(MilkContext);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(product.price);
  const handleAddToCart = () => {
    const existingCartItems =
      JSON.parse(localStorage.getItem("cartItems")) || [];

    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    const existingItemIndex = existingCartItems.findIndex(
      (item) => item.id === product.id
    );

    if (existingItemIndex !== -1) {
      // Nếu đã có trong giỏ hàng, tăng số lượng
      existingCartItems[existingItemIndex].quantity += quantity;
      existingCartItems[existingItemIndex].total += total;
    } else {
      // Nếu chưa có, thêm một mục mới vào giỏ hàng
      const cartItem = {
        ...product,
        quantity,
        total,
      };
      existingCartItems.push(cartItem);
    }

    // Lưu danh sách các mục giỏ hàng vào Local Storage dưới dạng chuỗi JSON
    localStorage.setItem("cartItems", JSON.stringify(existingCartItems));

    // Cập nhật state hoặc hiển thị thông báo thành công
    setCartItem(existingCartItems);
    setShowSuccessModal(true);
    // console.log(existingCartItems);
    // console.log(existingItemIndex);
  };
  setTimeout(() => {
    setShowSuccessModal(false);
  }, 5000);

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
      <ModalSuccessAddCart
        open={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </div>
  );
}

export default ActionButton;
