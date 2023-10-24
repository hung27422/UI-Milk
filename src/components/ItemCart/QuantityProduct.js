import classNames from "classnames/bind";
import styles from "./ItemCart.module.scss";
import { useContext, useState } from "react";
import { MilkContext } from "../ContextMilk/ContextMilk";
const cx = classNames.bind(styles);
function QuantityProduct({ data }) {
  return (
    <div className={cx("wrapper")}>
      <span className={cx("quantity")}>{data.quantity}</span>
    </div>
  );
}

export default QuantityProduct;
