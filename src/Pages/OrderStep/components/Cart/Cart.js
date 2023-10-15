import classNames from "classnames/bind";
import TableCart from "~/components/TableCart/TableCart";
import styles from "./Cart.module.scss";
import Button from "~/components/Button";
import configs from "~/configs";
import { useContext } from "react";
import { MilkContext } from "~/components/ContextMilk/ContextMilk";
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
  const { activeStep, setActiveStep } = useContext(MilkContext);

  const hanldeActiveStep = () => {
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
          <Button discount>Áp dụng</Button>
        </div>
        <div className={cx("total-price")}>
          <InfoPrice title={"TotalPrice"} numberPrice={24000}></InfoPrice>
        </div>
        <div className={cx("btn-action")}>
          <Button
            checkout
            to={configs.routes.payment}
            onClick={hanldeActiveStep}
          >
            Check out
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
