import classNames from "classnames/bind";
import styles from "./Shipment.module.scss";
// import DetailOrderStep from "../../DetailOrderStep/DetailOrderStep";
import FollowShipment from "./FollowShipment";
// import TableInfoDelivery from "~/Pages/OrderStep/components/Delivery/components/TableDelivery/TableInfoDelivery";
import { useContext, useEffect } from "react";
import { MilkContext } from "~/components/ContextMilk/ContextMilk";
import { TableInfoShipment } from "~/components/TableInfoProduct/TableInfoProductWrapper";
import { gql, useQuery } from "@apollo/client";
import TableDelivery from "~/Pages/OrderStep/components/Delivery/components/TableDelivery/TableDelivery";
import TableInfoDelivery from "~/Pages/OrderStep/components/Delivery/components/TableDelivery/TableInfoDelivery";
const cx = classNames.bind(styles);
function Shipment() {
  const { setActiveStepOrder } = useContext(MilkContext);
  useEffect(() => setActiveStepOrder(3), [setActiveStepOrder]);
  const apiTokenLocal = localStorage.getItem("apiToken");
  const { data } = useQuery(
    gql`
      query Orders($amount: Int!, $page: Int!) {
        orders(amount: $amount, page: $page) {
          cancelReason
          date
          id
          items {
            id
            order {
              id
            }
            name
            orderId
            price
            productId
            quantity
            sku
            subtotal
          }
          shippingAddress
          status
          total
          userId
        }
      }
    `,
    {
      variables: { amount: 10, page: 1 },
      context: {
        headers: {
          authorization: `Bearer ${apiTokenLocal}`,
        },
      },
    }
  );

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
        <div className={cx("info-product")}>
          <TableInfoShipment shipment order={data?.orders} />
        </div>
      </div>
    </div>
  );
}

export default Shipment;
