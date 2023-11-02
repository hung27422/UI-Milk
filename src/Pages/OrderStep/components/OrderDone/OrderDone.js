import classNames from "classnames/bind";
import styles from "./OrderDone.module.scss";
import OrderSteps from "~/components/OrderSteps";
import images from "~/assets/Images/Image";
import Button from "~/components/Button";
import configs from "~/configs";
import { useContext, useEffect } from "react";
import { MilkContext } from "~/components/ContextMilk/ContextMilk";
const cx = classNames.bind(styles);
function OrderDone() {
  const { setActiveStep } = useContext(MilkContext);
  useEffect(() => setActiveStep(3), [setActiveStep]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <OrderSteps />
      </div>
      <div className={cx("container")}>
        <div className={cx("show-notification")}>
          <img className={cx("img-done")} src={images.checkdone} alt="" />
          <h2 className={cx("notification")}>Bạn đã đặt hàng thành công</h2>
        </div>
      </div>
      <div className={cx("btn-action")}>
        <Button to={configs.routes.detailorder} orderDone>
          Xem chi tiết đơn hàng
        </Button>
      </div>
    </div>
  );
}

export default OrderDone;
