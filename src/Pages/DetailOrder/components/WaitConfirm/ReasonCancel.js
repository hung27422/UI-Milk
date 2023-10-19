import classNames from "classnames/bind";
import styles from "./WaitConfirm.module.scss";
import Button from "~/components/Button";
const cx = classNames.bind(styles);

function ReasonCancel() {
  return (
    <div className={cx("reason-cancel")}>
      <span className={cx("reason")}>Tôi muốn thay đổi địa chỉ</span>
      <Button selectChoose>Chọn</Button>
    </div>
  );
}

export default ReasonCancel;
