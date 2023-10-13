import classNames from "classnames/bind";
import styles from "./ItemCart.module.scss";
import { useContext } from "react";
import { MilkContext } from "../ContextMilk/ContextMilk";
const cx = classNames.bind(styles);
function TotalPrice() {
  const { total } = useContext(MilkContext);
  return (
    <div className={cx("wrapper")}>
      <span className={cx("total")}>{total} VNĐ</span>
    </div>
  );
}

export default TotalPrice;
