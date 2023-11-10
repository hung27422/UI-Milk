import { useState } from "react";
import classNames from "classnames/bind";
import styles from "../ConfirmDoneOrder.module.scss";
import Button from "~/components/Button";
const cx = classNames.bind(styles);

function ButtonDoneOrder() {
  const [showButton, setShowButton] = useState(false);
  const handleConfirmOrderDone = () => {
    setShowButton(true);
  };
  return (
    <div>
      {!showButton && (
        <div className={cx("action-btn")}>
          <Button confirmOrderDone onClick={handleConfirmOrderDone}>
            Đã nhận được hàng
          </Button>
        </div>
      )}

      {showButton && (
        <div className={cx("action-btn")}>
          <Button confirmOrderDone>Mua lại</Button>
        </div>
      )}
      {showButton && (
        <div className={cx("action-btn")}>
          <Button confirmOrderDone>Đánh giá sản phẩm</Button>
        </div>
      )}
    </div>
  );
}

export default ButtonDoneOrder;
