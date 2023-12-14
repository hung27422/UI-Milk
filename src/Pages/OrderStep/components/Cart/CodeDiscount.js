import classNames from "classnames/bind";
import styles from "./Cart.module.scss";
import Button from "~/components/Button";
import useQueryDiscount from "~/hooks/useQueryDiscount";
import { useContext, useState } from "react";
import { MilkContext } from "~/components/ContextMilk/ContextMilk";
import { useQuery } from "@apollo/client";
import useAvailableDiscount from "~/hooks/useAvailableDiscount";
import dayjs from "dayjs";
import { useEffect } from "react";
const cx = classNames.bind(styles);
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth() + 1;
const currentDay = currentDate.getDate();
const dateNow = `${currentYear}-${currentDay}-${currentMonth}`;
function CodeDiscount({ handleClose }) {
  const { setDiscount } = useContext(MilkContext);
  const localStorageCart = JSON.parse(localStorage.getItem("cartItems"));
  let total = 0;
  localStorageCart?.forEach((item) => {
    total = total + item.total;
  });

  console.log("tt", total);
  const { data: dataDiscount } = useAvailableDiscount({
    birthday: dayjs(dateNow),
    specialDay: dayjs(dateNow),
    total: total,
  });
  // console.log("123", dataDiscount, "dateNow", typeof dateNow);
  const handleDiscount = (item) => {
    setDiscount(item);
    handleClose();
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
