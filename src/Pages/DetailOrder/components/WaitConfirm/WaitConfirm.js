import classNames from "classnames/bind";
import styles from "./WaitConfirm.module.scss";
import { useEffect } from "react";
import { TableInfoProductWrapperOrder } from "~/components/TableInfoProduct/TableInfoProductWrapper";
import useQueryFindOrder from "~/hooks/useQueryFindOrder";
const cx = classNames.bind(styles);
function WaitConfirm() {
  const { data, error, refetch } = useQueryFindOrder({ status: "CREATED" });
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
        <TableInfoProductWrapperOrder waitConfirm order={data?.findOrdersByStatus} />
      </div>
    </div>
  );
}

export default WaitConfirm;
