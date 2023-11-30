import classNames from "classnames/bind";
import styles from "./LocationUser.module.scss";
import ButtonAddress from "./ButtonAddress";
import ButtonDeleteAddress from "./ButtonDeleteAddress";
import ButtonUpdateAddress from "./ButtonUpdateAddress";
import ButtonDefaultAddress from "./ButtonDefaultAddress";
import { useAuth0 } from "@auth0/auth0-react";
import useQueryAddress from "~/hooks/useQueryAddress";
const cx = classNames.bind(styles);
function LocationUser() {
  const userIdLocal = localStorage.getItem("userId");
  const { isAuthenticated } = useAuth0();

  const { data } = useQueryAddress();

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
