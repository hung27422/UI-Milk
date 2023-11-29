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
import useQueryFindOrder from "~/hooks/useQueryFindOrder";
const cx = classNames.bind(styles);
function DoneOrders() {
  const { setActiveStepOrder } = useContext(MilkContext);
  useEffect(() => setActiveStepOrder(5), [setActiveStepOrder]);
  const { data, error, refetch } = useQueryFindOrder({ status: "DONE" });
  useEffect(() => {
    if (error) {
      console.log(error);
    }
    if (data) {
      console.log("data", data);
      refetch();
    }
  }, [data, error, refetch]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("done-order")}>
        <TableInfoDoneOrderWrapperOrder
          doneOrder
          order={data?.findOrdersByStatus}
        />
      </div>
    </div>
  );
}

export default DoneOrders;
