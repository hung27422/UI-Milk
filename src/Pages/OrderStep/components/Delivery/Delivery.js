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
import useQueryPoint from "~/hooks/useQueryPoint";
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
  const { guest, stock, discount } = useContext(MilkContext);
  const [error, setError] = useState();
  const { isCheckedPoint, setIsCheckedPoint } = useContext(MilkContext);
  const localStorageCart = JSON.parse(localStorage.getItem("cartItems"));
  const { guestSchema } = useValidate();
  const { data: dataPoint } = useQueryPoint();
  // useEffect(() => {
  //   if (dataPoint) {
  //     console.log(dataPoint);
  //   }
  // }, [dataPoint]);
  let total = 0;
  let totalPrice = 0;
  const handleSaveInfoGuest = async () => {
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
  // Hàm xử lý khi checkbox thay đổi trạng thái
  const handleCheckboxChange = () => {
    setIsCheckedPoint(!isCheckedPoint);
  };

  if (localStorageCart) {
    localStorageCart.forEach((item) => {
      total += item.total;
    });

    if (discount) {
      total -= discount.amount;
    }
    if (isCheckedPoint && dataPoint) {
      total -= dataPoint.pointByUserId.point;
    }
    // Ensure the total price is not negative
    totalPrice = Math.max(total, 0);
  }
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
              {isAuthenticated && (
                <div className={cx("box-point")}>
                  <span className={cx("title-point")}>
                    Điểm tích lũy: {dataPoint?.pointByUserId.point}
                  </span>
                  <div className={cx("point-info")}>
                    <span
                      style={{
                        color: !isCheckedPoint ? "#ccc" : "var(--text-color)",
                        fontWeight: "600",
                      }}
                    >
                      [-{dataPoint?.pointByUserId.point}]
                    </span>
                    <div>
                      <input
                        className={cx("input-point")}
                        type="checkbox"
                        name=""
                        checked={isCheckedPoint}
                        onChange={handleCheckboxChange}
                      />
                    </div>
                  </div>
                </div>
              )}
              <div>
                <InfoPrice
                  title={"TotalPrice"}
                  numberPrice={totalPrice}
                ></InfoPrice>
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
