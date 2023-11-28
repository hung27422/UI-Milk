import classNames from "classnames/bind";
import styles from "./LocationUser.module.scss";
import Button from "~/components/Button";
import ButtonAddress from "./ButtonAddress";
import { gql, useQuery } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import ButtonDeleteAddress from "./ButtonDeleteAddress";
import ButtonUpdateAddress from "./ButtonUpdateAddress";
import ButtonDefaultAddress from "./ButtonDefaultAddress";
import { MilkContext } from "~/components/ContextMilk/ContextMilk";
import { useAuth0 } from "@auth0/auth0-react";
const cx = classNames.bind(styles);
function LocationUser() {
  const userIdLocal = localStorage.getItem("userId");
  const { indexAddress, setIndexAddress } = useContext(MilkContext);
  const { user, isAuthenticated } = useAuth0();
  const storedData = JSON.parse(localStorage.getItem("addressesData"));
  const { data, refetch } = useQuery(
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
        amount: 50,
        page: 1,
      },
      onCompleted: (data) => {
        // const storedData = JSON.parse(localStorage.getItem("addressesData"));
        setIndexAddress(data?.addresses);
      },
    }
  );
  // useEffect(() => {
  //   // Cập nhật danh sách địa chỉ mỗi khi có thay đổi trong data
  //   const storedData = JSON.parse(localStorage.getItem("addressesData"));
  //   console.log(storedData);
  //   if (!storedData) {
  //     setIndexAddress(data?.addresses);
  //   }
  //   if (storedData) {
  //     setIndexAddress(storedData);
  //   }
  // }, [data, setIndexAddress]);
  console.log("userID", userIdLocal);
  console.log(indexAddress);
  const newIndexAddress = [
    ...indexAddress.filter((address) => {
      // console.log(
      //   String(address?.id) === localStorage.getItem("defaultAddressID")
      // );
      return String(address?.id) === localStorage.getItem("defaultAddressID");
    }),
    ...indexAddress.filter((address) => {
      // console.log(
      //   String(address?.id) === localStorage.getItem("defaultAddressID")
      // );
      return String(address?.id) !== localStorage.getItem("defaultAddressID");
    }),
  ];
  if (!isAuthenticated) {
    return <></>;
  }
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <h2 className={cx("title")}>Địa chỉ của tôi</h2>
        <ButtonAddress />
      </div>
      <h2 style={{ padding: "12px 12px" }}>Địa chỉ</h2>
      {newIndexAddress?.map((item, index) => {
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
                  <ButtonUpdateAddress idAddress={item?.id} />
                  <ButtonDeleteAddress idAddress={item?.id} />
                </div>
                <div className={cx("btn-action")}>
                  <ButtonDefaultAddress idAddress={item?.id} index={index} />
                </div>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}

export default LocationUser;
