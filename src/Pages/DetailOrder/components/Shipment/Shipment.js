import classNames from "classnames/bind";
import styles from "./Shipment.module.scss";
import DetailOrderStep from "../../DetailOrderStep/DetailOrderStep";
import FollowShipment from "./FollowShipment";
import TableInfoDelivery from "~/Pages/OrderStep/components/Delivery/components/TableDelivery/TableInfoDelivery";
import { useContext, useEffect } from "react";
import { MilkContext } from "~/components/ContextMilk/ContextMilk";
const cx = classNames.bind(styles);
function Shipment() {
  const { setActiveStepOrder } = useContext(MilkContext);
  useEffect(() => setActiveStepOrder(3), [setActiveStepOrder]);
  return (
    <div className={cx("wrapper")}>
      {/* <div className={cx("header")}>
        <DetailOrderStep />
      </div> */}
      <div className={cx("shipment")}>
        <div className={cx("container")}>
          <TableInfoDelivery hiddenButtonAddresses />
          <div>
            <h2 className={cx("title")}>Theo dõi đơn hàng</h2>
            <FollowShipment />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shipment;
