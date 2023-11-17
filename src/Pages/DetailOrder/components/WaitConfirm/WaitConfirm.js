import classNames from "classnames/bind";
import styles from "./WaitConfirm.module.scss";
import ButtonCancelOrder from "./ButtonCancelOrder";
import { useContext, useEffect } from "react";
import { MilkContext } from "~/components/ContextMilk/ContextMilk";
import { gql, useQuery } from "@apollo/client";
import {
  TableInfoProductWrapperOrder,
  TableInfoProductWrapperOrderGuest,
} from "~/components/TableInfoProduct/TableInfoProductWrapper";
import { useAuth0 } from "@auth0/auth0-react";
const cx = classNames.bind(styles);
function WaitConfirm() {
  const apiTokenLocal = localStorage.getItem("apiToken");
  const { user, isAuthenticated } = useAuth0();
  const { setActiveStepOrder } = useContext(MilkContext);
  useEffect(() => setActiveStepOrder(1), [setActiveStepOrder]);
  const { data, error } = useQuery(
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
      variables: { amount: 50, page: 1 },
      context: {
        headers: {
          authorization: `Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiI0MzgxMzVlOC1lNDgwLTQ5NGQtOTRhNy1kNWJkY2ZkMDdlNmUiLCJuYW1lIjoiTWFjIiwianRpIjoiNDM4MTM1RTgtRTQ4MC00OTRELTk0QTctRDVCRENGRDA3RTZFIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJleHAiOjE3MDA0NTI5NzcsImlzcyI6IklmV2hhdCIsImF1ZCI6IklmV2hhdENsaWVudCJ9.GnwW0BAQZUY9C_HeA2O-3j9jjhKfSMGG4rVG7qgpD0miyvVB40_Ui72RCZuppObcXPgNg4Yd2cxTvTY2_wUUYA`,
        },
      },
    }
  );
  // useEffect(() => {
  //   if (error) {
  //     console.log(error);
  //   }
  //   if (data) {
  //     console.log(data);
  //   }
  // }, [data, error]);
  if (!isAuthenticated) {
    return (
      <div className={cx("wrapper")}>
        <TableInfoProductWrapperOrderGuest order={data?.orders} />
      </div>
    );
  }
  return (
    <div className={cx("wrapper")}>
      <div>
        <TableInfoProductWrapperOrder waitConfirm order={data?.orders} />
      </div>
      <div className={cx("btn-action")}>
        <ButtonCancelOrder />
      </div>
    </div>
  );
}

export default WaitConfirm;
