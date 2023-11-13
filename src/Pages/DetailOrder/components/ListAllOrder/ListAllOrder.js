import classNames from "classnames/bind";
import styles from "../WaitConfirm/WaitConfirm.module.scss";
import { useContext, useEffect } from "react";
import { MilkContext } from "~/components/ContextMilk/ContextMilk";
import { gql, useQuery } from "@apollo/client";
import {
  TableInfoAllOrderWrapper,
  TableInfoProductWrapperOrder,
} from "~/components/TableInfoProduct/TableInfoProductWrapper";
const cx = classNames.bind(styles);
function ListAllOrder() {
  const { setActiveStepOrder } = useContext(MilkContext);
  useEffect(() => setActiveStepOrder(0), [setActiveStepOrder]);
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
      variables: { amount: 60, page: 1 },
      context: {
        headers: {
          authorization: `Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiI0MzgxMzVlOC1lNDgwLTQ5NGQtOTRhNy1kNWJkY2ZkMDdlNmUiLCJuYW1lIjoiTWFjIiwianRpIjoiNDM4MTM1RTgtRTQ4MC00OTRELTk0QTctRDVCRENGRDA3RTZFIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJleHAiOjE3MDAxMTkxMDQsImlzcyI6IklmV2hhdCIsImF1ZCI6IklmV2hhdENsaWVudCJ9.MymEQKYU0IV_fUYVdDrXQopzTNmW48TAK6zR9Bz4YSZf51pJr73x8uXeXppNTqSvR89rEK5LBchZt_xvt3ljMQ`,
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

  return (
    <div className={cx("wrapper")}>
      <div>
        <TableInfoAllOrderWrapper order={data?.orders} />
      </div>
    </div>
  );
}

export default ListAllOrder;
