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
const cx = classNames.bind(styles);
function Delivery() {
  const { setActiveStep } = useContext(MilkContext);
  useEffect(() => setActiveStep(1), [setActiveStep]);
  const { guest, setGuest } = useContext(MilkContext);
  const { stock, setStock } = useContext(MilkContext);
  const [error, setError] = useState();

  const { guestSchema } = useValidate();
  const handleSaveInfoGuest = async () => {
    const storedGuest = JSON.parse(localStorage.getItem("guest"));
    console.log("guest", storedGuest);
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
              <Button to={configs.routes.orderstepper} delivery>
                Trở lại
              </Button>
              <Button
                // to={}
                onClick={handleSaveInfoGuest}
                delivery
              >
                Tiếp tục
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Delivery;
