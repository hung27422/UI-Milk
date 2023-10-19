import classNames from "classnames/bind";
import styles from "./WaitConfirm.module.scss";
import TableInfoProduct from "~/components/TableInfoProduct/TableInfoProduct";
import ButtonCancelOrder from "./ButtonCancelOrder";
const cx = classNames.bind(styles);
function WaitConfirm() {
  return (
    <div className={cx("wrapper")}>
      <div>
        <TableInfoProduct waitConfirm />
      </div>
      <div className={cx("btn-action")}>
        <ButtonCancelOrder />
      </div>
    </div>
  );
}

export default WaitConfirm;
