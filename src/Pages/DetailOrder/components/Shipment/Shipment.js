import classNames from "classnames/bind";
import styles from "./Shipment.module.scss";
// import DetailOrderStep from "../../DetailOrderStep/DetailOrderStep";
import FollowShipment from "./FollowShipment";
// import TableInfoDelivery from "~/Pages/OrderStep/components/Delivery/components/TableDelivery/TableInfoDelivery";
import { useContext, useEffect } from "react";
import { MilkContext } from "~/components/ContextMilk/ContextMilk";
import {
  TableInfoShipment,
  TableInfoShipmentGuest,
} from "~/components/TableInfoProduct/TableInfoProductWrapper";
import { gql, useQuery } from "@apollo/client";
import TableDelivery from "~/Pages/OrderStep/components/Delivery/components/TableDelivery/TableDelivery";
import TableInfoDelivery from "~/Pages/OrderStep/components/Delivery/components/TableDelivery/TableInfoDelivery";
import { useAuth0 } from "@auth0/auth0-react";
import useQueryFindOrder from "~/hooks/useQueryFindOrder";
const cx = classNames.bind(styles);
function Shipment() {
  const { setActiveStepOrder } = useContext(MilkContext);
  useEffect(() => setActiveStepOrder(3), [setActiveStepOrder]);
  const { data, error, refetch } = useQueryFindOrder({ status: "SHIPPING" });
  useEffect(() => {
    if (error) {
      console.log(error);
    }
    if (data) {
      refetch();
    }
  }, [data, error, refetch]);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("shipment")}>
        <div className={cx("container")}>
          <TableInfoDelivery hiddenButtonAddresses />
        </div>
        <div className={cx("info-product")}>
          <TableInfoShipment shipment order={data?.findOrdersByStatus} />
        </div>
      </div>
    </div>
  );
}

export default Shipment;
