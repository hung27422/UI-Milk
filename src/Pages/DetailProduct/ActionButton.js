import classNames from "classnames/bind";
import styles from "./Detail.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faShop } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { MilkContext } from "~/components/ContextMilk/ContextMilk";
import ModalSuccessAddCart from "~/components/ModalSuccessAddCart/ModalSuccessAddCart";
const cx = classNames.bind(styles);

function ActionButton({ product, idInventory }) {
  const { setCartItem, setShowTotal } = useContext(MilkContext);
  const { inventory } = useContext(MilkContext);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(product.price);
  const [showStock, setShowStock] = useState(false);
  const [quantityInventory, setQuantityInventory] = useState();
  const handleAddToCart = () => {
    const existingCartItems =
      JSON.parse(localStorage.getItem("cartItems")) || [];
    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    const existingItemIndex = existingCartItems.findIndex(
      (item) => item.id === product.id
    );
    if (idInventory) {
      const inventoryItem = inventory.find((item) => item.id === idInventory);

      if (inventoryItem && existingItemIndex === -1) {
        // If the product is not already in the cart, check the inventory
        if (quantity > inventoryItem.quantity) {
          setShowStock(true);
          setQuantityInventory(inventoryItem?.quantity);
          setShowSuccessModal(true);
          return;
        }
      }
    }

    if (existingItemIndex !== -1) {
      // Nếu đã có trong giỏ hàng, tăng số lượng
      existingCartItems[existingItemIndex].quantity += parseInt(quantity, 10);
      existingCartItems[existingItemIndex].total += total;
    } else {
      // Nếu chưa có, thêm một mục mới vào giỏ hàng
      const cartItem = {
        ...product,
        quantity: parseInt(quantity, 10),
        total: parseInt(total, 10),
      };
      existingCartItems.push(cartItem);
    }
    // Lưu danh sách các mục giỏ hàng vào Local Storage dưới dạng chuỗi JSON
    localStorage.setItem("cartItems", JSON.stringify(existingCartItems));
    // Cập nhật state hoặc hiển thị thông báo thành công
    setCartItem(existingCartItems);
    setShowSuccessModal(true);
  };
  useEffect(() => {
    const close = setInterval(() => {
      setShowSuccessModal(false);
    }, 20000);

    return () => clearInterval(close);
  }, []);
  const updateTotalPrice = (newQuantity) => {
    const newTotal = product.price * newQuantity;
    setTotal(newTotal);
    setShowTotal(true);
  };
  const handleInputQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      setQuantity(newQuantity);
      updateTotalPrice(newQuantity);
    } else {
      setQuantity(1);
      updateTotalPrice(1);
    }
  };

  const handleQuantityMinus = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateTotalPrice(newQuantity);
    }
  };

  const handleQuantityAdd = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateTotalPrice(newQuantity);
    setShowTotal(true);
  };

  return (
    <div className={cx("action-btn")}>
      <div className={cx("select-quantity")}>
        <button className={cx("btn-minus")} onClick={handleQuantityMinus}>
          -
        </button>
        <input
          className={cx("current-quantity")}
          value={quantity}
          onChange={(e) => handleInputQuantityChange(e)}
        />
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
        showStock={showStock}
        quantityInventory={quantityInventory}
        onClose={() => setShowSuccessModal(false)}
      />
    </div>
  );
}

export default ActionButton;
