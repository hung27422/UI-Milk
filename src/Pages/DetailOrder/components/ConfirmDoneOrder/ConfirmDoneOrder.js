import classNames from "classnames/bind";
import styles from "./ConfirmDoneOrder.module.scss";
import DetailOrderStep from "../../DetailOrderStep/DetailOrderStep";
import TableInfoProduct from "~/components/TableInfoProduct/TableInfoProduct";
import Button from "~/components/Button";
import { useState } from "react";
const cx = classNames.bind(styles);
function DoneOrder() {
  const [showButton, setShowButton] = useState(false);
  const handleConfirmOrderDone = () => {
    setShowButton(true);
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <DetailOrderStep />
      </div>
      <div className={cx("done-order")}>
        <TableInfoProduct doneOrder />
        <div className={cx("action-btn")}>
          {!showButton && (
            <Button confirmOrderDone onClick={handleConfirmOrderDone}>
              Đã nhận được hàng
            </Button>
          )}

          {showButton && <Button confirmOrderDone>Mua lại</Button>}
          {showButton && <Button confirmOrderDone>Đánh giá sản phẩm</Button>}
        </div>
      </div>
    </div>
  );
}

export default DoneOrder;
