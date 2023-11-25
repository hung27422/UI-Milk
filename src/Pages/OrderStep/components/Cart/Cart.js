import classNames from "classnames/bind";
import styles from "./Cart.module.scss";
import TableCart from "~/components/TableCart/TableCart";
import Button from "~/components/Button";
import configs from "~/configs";
import { useContext, useEffect } from "react";
import { MilkContext } from "~/components/ContextMilk/ContextMilk";
import ButtonDiscount from "./ButtonDiscount";
const cx = classNames.bind(styles);

const InfoPrice = ({ numberPrice, title }) => {
  return (
    <>
      <h3 className={cx("title")}>{title}</h3>
      <span className={cx("content")}>{numberPrice} VNĐ</span>
    </>
  );
};
function Cart() {
  const localStorageCart = JSON.parse(localStorage.getItem("cartItems"));
  const { setActiveStep } = useContext(MilkContext);
  useEffect(() => setActiveStep(0), [setActiveStep]);
  let total = 0;
  if (localStorageCart?.length === 0) {
    return (
      <div className={cx("wrapper", "no-cart")}>
        <h3>Bạn chưa có sản phẩm nào trong giỏ hàng</h3>
        <img
          className={cx("img-cart")}
          src="https://bizweb.dktcdn.net/100/320/202/themes/714916/assets/empty-cart.png?1650292912948"
          alt=""
        />
      </div>
    );
  }
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <TableCart />
      </div>
      <div className={cx("container")}>
        <div className={cx("discount")}>
          <div className={cx("discount-item")}>
            <InfoPrice title={"Discount"} numberPrice={"0"} />
          </div>
          <ButtonDiscount />
        </div>
        <div className={cx("total-price")}>
          {localStorageCart?.forEach((item) => {
            total = total + item.total;
          })}
          <InfoPrice title={"TotalPrice"} numberPrice={total}></InfoPrice>
        </div>
        <div className={cx("btn-action")}>
          <Button checkout to={configs.routes.delivery}>
            Mua hàng
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
