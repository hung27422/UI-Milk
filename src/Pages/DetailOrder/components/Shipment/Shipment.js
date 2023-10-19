import classNames from "classnames/bind";
import styles from "./Shipment.module.scss";
import DetailOrderStep from "../../DetailOrderStep/DetailOrderStep";
import FollowShipment from "./FollowShipment";
import TableInfoDelivery from "~/Pages/OrderStep/components/Delivery/components/TableDelivery/TableInfoDelivery";
const cx = classNames.bind(styles);
function Shipment() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <DetailOrderStep />
      </div>
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
