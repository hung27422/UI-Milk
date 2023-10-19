import classNames from "classnames/bind";
import styles from "./DetailOrder.module.scss";
import DetailOrderStep from "./DetailOrderStep/DetailOrderStep";
import WaitConfirm from "./components/WaitConfirm/WaitConfirm";
const cx = classNames.bind(styles);
function DetailOrder() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <DetailOrderStep />
      </div>
      <div className={cx("wait-confirm")}>
        <WaitConfirm />
      </div>
    </div>
  );
}

export default DetailOrder;
