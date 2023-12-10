import classNames from "classnames/bind";
import styles from "./Cart.module.scss";
import Button from "~/components/Button";
import useQueryDiscount from "~/hooks/useQueryDiscount";
import { useContext, useState } from "react";
import { MilkContext } from "~/components/ContextMilk/ContextMilk";
import { useQuery } from "@apollo/client";
import useAvailableDiscount from "~/hooks/useAvailableDiscount";
const cx = classNames.bind(styles);
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth() + 1;
const currentDay = currentDate.getDate();
const dateNow = `${currentDay}/${currentMonth}/${currentYear}`;
function CodeDiscount({ handleClose }) {
  const { data } = useQueryDiscount();
  const { discount, setDiscount } = useContext(MilkContext);
  const [showAcnoument, setShowAcnoument] = useState(false);
  const { data: dataDiscount } = useAvailableDiscount({
    birthday: dateNow,
    specialDay: dateNow,
    total: 0,
  });
  console.log("123", dataDiscount);
  const handleDiscount = (item) => {
    const activeDate = new Date(formatDate(item.activeDate));
    const expireDate = new Date(formatDate(item.expireDate));
    const currentDate = new Date(dateNow);

    if (currentDate < activeDate || currentDate > expireDate) {
      setShowAcnoument(true);
    } else {
      setDiscount(item);
      handleClose();
    }
  };
  return (
    <div className={cx("code-discount")}>
      <div className={cx("form-discount")}>
        <span className={cx("title-voucher")}>Mã Voucher: </span>
        <input
          className={cx("input-voucher")}
          type="search"
          placeholder="Nhập mã voucher"
        />
        <Button selectChoose>Áp Dụng</Button>
      </div>
      {showAcnoument && (
        <span style={{ color: "red" }}>
          Không được dùng voucher này. Hãy xem lại hạn sử dụng
        </span>
      )}
      {dataDiscount?.availableDiscounts.map((item) => {
        return (
          <div className={cx("scroll")} key={item?.id}>
            <div className={cx("list-discount")}>
              <div className={cx("discount-des")}>
                <span>{item?.description}</span>
              </div>
              <div className={cx("discount-item")}>
                <span className={cx("desc-discount")}>
                  Giảm: {item?.amount} VNĐ
                </span>
                <span className={cx("expiry")}>
                  Hạn sử dụng:{formatDate(item?.activeDate)} -
                  {formatDate(item?.expireDate)}
                </span>
              </div>
              <Button selectChoose onClick={() => handleDiscount(item)}>
                Chọn
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CodeDiscount;
