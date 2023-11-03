import classNames from "classnames/bind";
import styles from "./ItemCart.module.scss";
const cx = classNames.bind(styles);
function TotalPrice({ data }) {
  return (
    <div className={cx("wrapper")}>
      <span className={cx("total")}>
        {data?.total ? data?.total : data?.price * data?.quantity} VNĐ
      </span>
    </div>
  );
}

export default TotalPrice;
