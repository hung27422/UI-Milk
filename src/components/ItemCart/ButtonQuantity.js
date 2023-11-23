// import classNames from "classnames/bind";
// import styles from "./ItemCart.module.scss";
// import { useState } from "react";
// const cx = classNames.bind(styles);
// function ButtonQuantity() {
//   const [quantity, setQuantity] = useState(1);
//   const [total, setTotal] = useState(product.price);
//   const handleQuantityMinus = () => {
//     if (quantity <= 1) {
//       return;
//     }
//     setQuantity(quantity - 1);
//     setTotal(total - product.price);
//   };

//   const handleQuantityAdd = () => {
//     const newQuantity = quantity + 1;
//     setQuantity(newQuantity);
//     setTotal(product.price * newQuantity);
//     setShowTotal(true);
//   };
//   return (
//     <div className={cx("select-quantity")}>
//       <button className={cx("btn-minus")} onClick={handleQuantityMinus}>
//         -
//       </button>
//       <span className={cx("current-quantity")}>{quantity}</span>
//       <button className={cx("btn-add")} onClick={handleQuantityAdd}>
//         +
//       </button>
//     </div>
//   );
// }

// export default ButtonQuantity;
