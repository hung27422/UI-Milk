import classNames from "classnames/bind";
import styles from "./Delivery.module.scss";
import OrderSteps from "~/components/OrderSteps";
import TableDelivery from "./components/TableDelivery/TableDelivery";
import Button from "~/components/Button";
import { useContext, useEffect } from "react";
import { MilkContext } from "~/components/ContextMilk/ContextMilk";
import configs from "~/configs";
const cx = classNames.bind(styles);
function Delivery() {
  const { setActiveStep } = useContext(MilkContext);
  useEffect(() => setActiveStep(1), [setActiveStep]);
  const { guest, setGuest } = useContext(MilkContext);
  const handleSaveInfoGuest = () => {
    console.log(guest);
    // setGuest(valueGuest);
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <OrderSteps />
      </div>
      <div className={cx("delivery")}>
        <div className={cx("info-delivery")}>
          <TableDelivery />
        </div>
        <div className={cx("btn-action")}>
          <Button to={configs.routes.orderstepper} delivery>
            Trở lại
          </Button>
          <Button
            to={configs.routes.payment}
            onClick={handleSaveInfoGuest}
            delivery
          >
            Tiếp tục
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Delivery;
