import classNames from "classnames/bind";
import styles from "./Delivery.module.scss";
import OrderSteps from "~/components/OrderSteps";
import TableDelivery from "./components/TableDelivery/TableDelivery";
import Button from "~/components/Button";
import { useContext, useEffect, useState } from "react";
import { MilkContext } from "~/components/ContextMilk/ContextMilk";
import configs from "~/configs";
import ModalSuccessAddCart from "~/components/ModalSuccessAddCart/ModalSuccessAddCart";
import useValidate from "~/hooks/useValidate";
import { useAuth0 } from "@auth0/auth0-react";
import ButtonDiscount from "../Cart/ButtonDiscount";
const cx = classNames.bind(styles);
const InfoPrice = ({ numberPrice, title }) => {
  return (
    <div style={{ widows: "120px", textAlign: "center" }}>
      <h3 className={cx("title-price")}>{title}</h3>
      <span className={cx("content")}>{numberPrice} VNĐ</span>
    </div>
  );
};
function Delivery() {
  const { setActiveStep } = useContext(MilkContext);
  const { isAuthenticated } = useAuth0();
  useEffect(() => setActiveStep(1), [setActiveStep]);
  const { guest, setGuest } = useContext(MilkContext);
  const { stock, setStock } = useContext(MilkContext);
  const { discount, setDiscount } = useContext(MilkContext);
  const [error, setError] = useState();
  const localStorageCart = JSON.parse(localStorage.getItem("cartItems"));
  const { guestSchema } = useValidate();
  let total = 0;
  const handleSaveInfoGuest = async () => {
    const storedGuest = JSON.parse(localStorage.getItem("guest"));

    const validationResult = await guestSchema.validate(guest, {
      abortEarly: false,
    });
    if (validationResult.error) {
      setError(
        validationResult.error.details
          .map((detail) => detail.message)
          .join(", ")
      );
      return;
    } else {
      window.location.href = `${configs.routes.payment}`;
    }
  };

  return (
    <>
      {stock ? (
        <ModalSuccessAddCart showStock={stock} />
      ) : (
        <div className={cx("wrapper")}>
          <div className={cx("header")}>
            <OrderSteps />
          </div>
          <div className={cx("delivery")}>
            <div className={cx("info-delivery")}>
              <TableDelivery error={error} />
            </div>
            <div className={cx("btn-action")}>
              <div className={cx("box-discount")}>
                <span className={cx("title-discount")}>Chọn mã giảm giá: </span>
                <ButtonDiscount />
              </div>
              <div>
                {localStorageCart?.forEach((item) => {
                  total = discount
                    ? total + item.total - discount?.amount
                    : total + item.total;
                })}
                <InfoPrice title={"TotalPrice"} numberPrice={total}></InfoPrice>
              </div>
              <div>
                <Button to={configs.routes.orderstepper} delivery>
                  Trở lại
                </Button>
                {isAuthenticated ? (
                  <Button to={configs.routes.payment} delivery>
                    Tiếp tục
                  </Button>
                ) : (
                  <Button onClick={handleSaveInfoGuest}>Tiếp tục</Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Delivery;
