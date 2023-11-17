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
  const { data } = useQuery(
    gql`
      query Orders($amount: Int!, $page: Int!) {
        orders(amount: $amount, page: $page) {
          cancelReason
          date
          id
          shippingAddress
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
          status
          total
          userId
          phone
          userName
        }
      }
    `,
    {
      variables: { amount: 10, page: 1 },
      context: {
        headers: {
          authorization: `Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiI0MzgxMzVlOC1lNDgwLTQ5NGQtOTRhNy1kNWJkY2ZkMDdlNmUiLCJuYW1lIjoiTWFjIiwianRpIjoiNDM4MTM1RTgtRTQ4MC00OTRELTk0QTctRDVCRENGRDA3RTZFIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJleHAiOjE3MDA0NTI5NzcsImlzcyI6IklmV2hhdCIsImF1ZCI6IklmV2hhdENsaWVudCJ9.GnwW0BAQZUY9C_HeA2O-3j9jjhKfSMGG4rVG7qgpD0miyvVB40_Ui72RCZuppObcXPgNg4Yd2cxTvTY2_wUUYA`,
        },
      },
    }
  );
  if (!isAuthenticated) {
    return (
      <div className={cx("shipment")}>
        <TableInfoShipmentGuest order={data?.orders} />
      </div>
    );
  }
  return (
    <div className={cx("wrapper")}>
      {/* <div className={cx("header")}>
        <DetailOrderStep />
      </div> */}
      <div className={cx("shipment")}>
        <div className={cx("container")}>
          <TableInfoDelivery hiddenButtonAddresses />
        </div>
        <div className={cx("info-product")}>
          <TableInfoShipment shipment order={data?.orders} />
        </div>
      </div>
    </div>
  );
}

export default Shipment;
