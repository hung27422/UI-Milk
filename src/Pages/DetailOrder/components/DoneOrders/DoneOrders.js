import classNames from "classnames/bind";
import styles from "../DeliveredOrder/ConfirmDoneOrder.module.scss";
import { useContext, useEffect, useState } from "react";
import { MilkContext } from "~/components/ContextMilk/ContextMilk";
import {
  TableInfoDoneOrderWrapperOrder,
  TableInfoDoneOrderWrapperOrderGuest,
} from "~/components/TableInfoProduct/TableInfoProductWrapper";
import { gql, useQuery } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
const cx = classNames.bind(styles);
function DoneOrders() {
  const { setActiveStepOrder } = useContext(MilkContext);
  useEffect(() => setActiveStepOrder(5), [setActiveStepOrder]);
  const { isAuthenticated } = useAuth0();
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
          status: "DONE",
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
  useEffect(() => {
    if (error) {
      console.log(error);
    }
  });
  if (!isAuthenticated) {
    return (
      <div className={cx("wrapper")}>
        <div className={cx("done-order")}>
          <TableInfoDoneOrderWrapperOrderGuest
            doneOrder
            order={data?.findOrders}
          />
        </div>
      </div>
    );
  }
  return (
    <div className={cx("wrapper")}>
      <div className={cx("done-order")}>
        <TableInfoDoneOrderWrapperOrder doneOrder order={data?.findOrders} />
      </div>
    </div>
  );
}

export default DoneOrders;
