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
const cx = classNames.bind(styles);
function Shipment() {
  const { setActiveStepOrder } = useContext(MilkContext);
  const { user, isAuthenticated } = useAuth0();
  useEffect(() => setActiveStepOrder(3), [setActiveStepOrder]);
  const apiTokenLocal = localStorage.getItem("apiToken");
  const { data, error } = useQuery(
    gql`
      query FindOrders(
        $query: orderGetOrderInput!
        $amount: Int!
        $page: Int!
      ) {
        findOrders(query: $query, amount: $amount, page: $page) {
          cancelReason
          date
          id
          items {
            id
            name
            orderId
            price
            productId
            quantity
            sku
            subtotal
          }
          phone
          shippingAddress
          status
          total
          userId
          userName
        }
      }
    `,
    {
      variables: {
        query: {
          status: "SHIPPING",
        },
        page: 1,
        amount: 10,
      },
      context: {
        headers: {
          authorization: `Bearer ${apiTokenLocal}`,
        },
      },
    }
  );
  if (!isAuthenticated) {
    return (
      <div className={cx("shipment")}>
        <TableInfoShipmentGuest order={data?.findOrders} />
      </div>
    );
  }
  return (
    <div className={cx("wrapper")}>
      <div className={cx("shipment")}>
        <div className={cx("container")}>
          <TableInfoDelivery hiddenButtonAddresses />
        </div>
        <div className={cx("info-product")}>
          <TableInfoShipment shipment order={data?.findOrders} />
        </div>
      </div>
    </div>
  );
}

export default Shipment;
