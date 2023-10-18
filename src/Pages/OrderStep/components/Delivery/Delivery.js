import classNames from "classnames/bind";
import styles from "./Delivery.module.scss";
import OrderSteps from "~/components/OrderSteps";
import TableDelivery from "./components/TableDelivery/TableDelivery";
import Button from "~/components/Button";
import { useContext } from "react";
import { MilkContext } from "~/components/ContextMilk/ContextMilk";
import configs from "~/configs";
const cx = classNames.bind(styles);
function Delivery() {
  const { activeStep, setActiveStep } = useContext(MilkContext);
  const handleActiveStep = () => {
    setActiveStep(activeStep + 1);
  };
  const handleActiveStepPre = () => {
    setActiveStep(activeStep - 1);
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
          <Button
            to={configs.routes.orderstepper}
            delivery
            onClick={handleActiveStepPre}
          >
            Trở lại
          </Button>
          <Button
            to={configs.routes.payment}
            delivery
            onClick={handleActiveStep}
          >
            Tiếp tục
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Delivery;
