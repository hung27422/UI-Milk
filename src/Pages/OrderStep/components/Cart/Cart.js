import classNames from "classnames/bind";
import styles from "./Cart.module.scss";
import TableCart from "~/components/TableCart/TableCart";
import Button from "~/components/Button";
import configs from "~/configs";
import { useContext } from "react";
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
  const { cartItem } = useContext(MilkContext);
  const { activeStep, setActiveStep } = useContext(MilkContext);
  let total = 0;
  const handleActiveStep = () => {
    setActiveStep(activeStep + 1);
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <TableCart />
      </div>
      <div className={cx("container")}>
        <div className={cx("discount")}>
          <div className={cx("discount-item")}>
            <InfoPrice title={"Discount"} numberPrice={"- 5000"} />
          </div>
          <ButtonDiscount />
        </div>
        <div className={cx("total-price")}>
          {cartItem.forEach((item) => {
            total = total + item.total;
          })}
          <InfoPrice title={"TotalPrice"} numberPrice={total}></InfoPrice>
        </div>
        <div className={cx("btn-action")}>
          <Button
            checkout
            to={configs.routes.delivery}
            onClick={handleActiveStep}
          >
            Mua hàng
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
