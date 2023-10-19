import classNames from "classnames/bind";
import styles from "../../Delivery.module.scss";
import Button from "~/components/Button";

const cx = classNames.bind(styles);
function Address({ children, selectAddress, border }) {
  return (
    <div className={cx("info-address", { border })}>
      <span className={cx("address")}>{children}</span>
      {selectAddress && (
        <div className={cx("btn-action")}>
          <Button selectChoose>Chọn</Button>
        </div>
      )}
    </div>
  );
}

export default Address;
