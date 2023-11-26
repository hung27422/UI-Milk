import classNames from "classnames/bind";
import styles from "../WaitConfirm/WaitConfirm.module.scss";
import { useContext, useEffect } from "react";
import { MilkContext } from "~/components/ContextMilk/ContextMilk";
import { gql, useQuery } from "@apollo/client";
import {
  TableInfoCancelOrderWrapperOrder,
  TableInfoCancelOrderWrapperOrderGuest,
  TableInfoConfirmWrapperOrder,
  TableInfoConfirmWrapperOrderGuest,
} from "~/components/TableInfoProduct/TableInfoProductWrapper";
import { useAuth0 } from "@auth0/auth0-react";
import useQueryFindOrder from "~/hooks/useQueryFindOrder";
const cx = classNames.bind(styles);
function CancelOrders() {
  const { setActiveStepOrder } = useContext(MilkContext);
  const { isAuthenticated } = useAuth0();

  useEffect(() => setActiveStepOrder(6), [setActiveStepOrder]);
  const { data, error, refetch } = useQueryFindOrder({ status: "CANCELLED" });
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
        <TableInfoCancelOrderWrapperOrder
          cancelOrder
          order={data?.findOrders}
        />
      </div>
    </div>
  );
}

export default CancelOrders;
