import classNames from "classnames/bind";
import styles from "./ButtonPayment.module.scss";
import Button from "~/components/Button";
import { useContext } from "react";
import { MilkContext } from "~/components/ContextMilk/ContextMilk";
import configs from "~/configs";
const cx = classNames.bind(styles);
function ButtonPayment() {
  const { activeStep, setActiveStep } = useContext(MilkContext);

  const hanldeActiveStep = () => {
    setActiveStep(activeStep + 1);
  };
  const hanldeActiveStepPre = () => {
    setActiveStep(activeStep - 1);
  };
  return (
    <div className={cx("btn-action")}>
      <Button to={configs.routes.orderstepper} payment onClick={hanldeActiveStepPre}>
        Trở lại
      </Button>
      <Button to={configs.routes.delivery} payment onClick={hanldeActiveStep}>
        Tiếp tục
      </Button>
    </div>
  );
}

export default ButtonPayment;
