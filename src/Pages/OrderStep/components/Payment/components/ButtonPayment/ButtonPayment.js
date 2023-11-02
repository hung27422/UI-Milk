import classNames from "classnames/bind";
import styles from "./ButtonPayment.module.scss";
import Button from "~/components/Button";

import configs from "~/configs";
const cx = classNames.bind(styles);
function ButtonPayment() {
  return (
    <div className={cx("btn-action")}>
      <Button to={configs.routes.delivery} payment>
        Trở lại
      </Button>
      <Button to={configs.routes.orderdone} payment>
        Xác nhận thanh toán
      </Button>
    </div>
  );
}

export default ButtonPayment;
