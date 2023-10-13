import classNames from "classnames/bind";
import styles from "./ItemCart.module.scss";
import { useContext, useState } from "react";
import { MilkContext } from "../ContextMilk/ContextMilk";
const cx = classNames.bind(styles);
function QuantityProduct() {
  const [quantity, setQuantity] = useState(1);
  const { total, setTotal } = useContext(MilkContext);

  const handleQuantityMinus = () => {
    if (quantity <= 1) {
      return;
    }
    setQuantity(quantity - 1);
    setTotal(total - 8000);
  };
  const handleQuantityAdd = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    setTotal(8000 * newQuantity);
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("select-quantity")}>
        <button className={cx("btn-minus")} onClick={handleQuantityMinus}>
          -
        </button>
        <span className={cx("current-quantity")}>{quantity}</span>
        <button className={cx("btn-add")} onClick={handleQuantityAdd}>
          +
        </button>
      </div>
    </div>
  );
}

export default QuantityProduct;
