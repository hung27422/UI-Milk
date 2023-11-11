import classNames from "classnames/bind";
import styles from "./LocationUser.module.scss";
import Button from "~/components/Button";
import ButtonAddress from "./ButtonAddress";
import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";
const cx = classNames.bind(styles);
function LocationUser() {
  const userIdLocal = localStorage.getItem("userId");
  const { data, error } = useQuery(
    gql`
      query Addresses($amount: Int!, $page: Int!) {
        addresses(amount: $amount, page: $page) {
          city
          detail
          district
          id
          name
          phone
          userId
          ward
        }
      }
    `,
    {
      variables: {
        amount: 12,
        page: 1,
      },
    }
  );
  useEffect(() => {
    if (error) {
      console.log("error", error);
    } else if (data) {
      console.log(data.addresses);
    }
  });
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <h2 className={cx("title")}>Địa chỉ của tôi</h2>
        <ButtonAddress />
      </div>
      <h2 style={{ padding: "12px 12px" }}>Địa chỉ</h2>
      {data?.addresses.map((item, index) => {
        if (item?.userId === userIdLocal.toLocaleLowerCase()) {
          return (
            <div className={cx("content")} key={item.id}>
              <div className={cx("content-user")}>
                <div className={cx("info-user")}>
                  <span className={cx("user")}>{item?.name}</span>
                  <span className={cx("user")}>|</span>
                  <span className={cx("user")}>{item?.phone}</span>
                </div>
                <div className={cx("info-address")}>
                  <span>
                    {item?.detail}, {item?.ward}, {item?.district}, {item?.city}
                  </span>
                </div>
              </div>
              <div className={cx("content-action")}>
                <div className={cx("btn-action")}>
                  <Button updateAddress>Cập nhật</Button>
                </div>
                <div className={cx("btn-action")}>
                  <Button addressDefault>Mặc định</Button>
                </div>
              </div>
            </div>
          );
        }
        return <>Không có dữ liệu</>;
      })}
    </div>
  );
}

export default LocationUser;
