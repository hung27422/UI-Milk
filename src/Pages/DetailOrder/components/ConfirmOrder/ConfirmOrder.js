import classNames from "classnames/bind";
import styles from "../WaitConfirm/WaitConfirm.module.scss";
import { useContext, useEffect } from "react";
import { MilkContext } from "~/components/ContextMilk/ContextMilk";
import { gql, useQuery } from "@apollo/client";
import { TableInfoConfirmWrapperOrder } from "~/components/TableInfoProduct/TableInfoProductWrapper";
import useQueryFindOrder from "~/hooks/useQueryFindOrder";
const cx = classNames.bind(styles);
function ConfirmOrder() {
  const { setActiveStepOrder } = useContext(MilkContext);
  useEffect(() => setActiveStepOrder(2), [setActiveStepOrder]);
  const { data, error, refetch } = useQueryFindOrder({ status: "CONFIRMED" });
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
      <div>
        <TableInfoConfirmWrapperOrder
          confirm
          order={data?.findOrdersByStatus}
        />
      </div>
    </div>
  );
}

export default ConfirmOrder;
