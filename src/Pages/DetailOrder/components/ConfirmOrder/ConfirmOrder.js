import classNames from "classnames/bind";
import styles from "../WaitConfirm/WaitConfirm.module.scss";
import { useContext, useEffect } from "react";
import { MilkContext } from "~/components/ContextMilk/ContextMilk";
import { gql, useQuery } from "@apollo/client";
import { TableInfoConfirmWrapperOrder } from "~/components/TableInfoProduct/TableInfoProductWrapper";
const cx = classNames.bind(styles);
function ConfirmOrder() {
  const { setActiveStepOrder } = useContext(MilkContext);
  useEffect(() => setActiveStepOrder(2), [setActiveStepOrder]);
  const apiTokenLocal = localStorage.getItem("apiToken");
  const { data, error } = useQuery(
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
          authorization: `Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiI0MzgxMzVlOC1lNDgwLTQ5NGQtOTRhNy1kNWJkY2ZkMDdlNmUiLCJuYW1lIjoiTWFjIiwianRpIjoiNDM4MTM1RTgtRTQ4MC00OTRELTk0QTctRDVCRENGRDA3RTZFIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJleHAiOjE3MDA0NTI5NzcsImlzcyI6IklmV2hhdCIsImF1ZCI6IklmV2hhdENsaWVudCJ9.GnwW0BAQZUY9C_HeA2O-3j9jjhKfSMGG4rVG7qgpD0miyvVB40_Ui72RCZuppObcXPgNg4Yd2cxTvTY2_wUUYA`,
        },
      },
    }
  );
  useEffect(() => {
    if (error) {
      console.log(error);
    }
    if (data) {
      console.log("data", data);
    }
  }, [data, error]);

  return (
    <div className={cx("wrapper")}>
      <div>
        <TableInfoConfirmWrapperOrder confirm order={data?.orders} />
      </div>
    </div>
  );
}

export default ConfirmOrder;
