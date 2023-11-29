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
  const { isAuthenticated } = useAuth0();

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
          isDefault
        }
      }
    `,
    {
      variables: {
        amount: 50,
        page: 1,
      },
    }
  );
  // useEffect(() => {
  //   if (data) {
  //     console.log(data);
  //     refetch();
  //   }
  // }, [data, refetch]);

  const newIndexAddress = [
    data?.addresses.filter((address) => {
      return address?.isDefault === true;
    }),
    data?.addresses.filter((address) => {
      return address?.isDefault === false;
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
      {newIndexAddress?.map((addressGroup, index) => {
        return addressGroup?.map((item) => {
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
                      {item?.detail}, {item?.ward}, {item?.district},{" "}
                      {item?.city}
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
        });
      })}
    </div>
  );
}

export default LocationUser;
