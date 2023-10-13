import classNames from "classnames/bind";
import TableCart from "~/components/TableCart/TableCart";
import styles from "./Cart.module.scss";
import Button from "~/components/Button";
const cx = classNames.bind(styles);
function Cart() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <TableCart />
      </div>
      <div className={cx("btn-action")}>
        <Button checkout>Check out</Button>
      </div>
    </div>
  );
}

export default Cart;
