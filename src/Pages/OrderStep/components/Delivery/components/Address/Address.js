import classNames from "classnames/bind";
import styles from "../../Delivery.module.scss";
import { Button } from "@mui/material";
import { useContext } from "react";
import { MilkContext } from "~/components/ContextMilk/ContextMilk";
import ButtonDefaultAddress from "~/Pages/Profile/LocationUser/ButtonDefaultAddress";
import ButtonDeleteAddress from "~/Pages/Profile/LocationUser/ButtonDeleteAddress";

const cx = classNames.bind(styles);
function Address({ children, selectAddress, border, data }) {
  const storedData = JSON.parse(localStorage.getItem("addressesData"));
  // const { indexAddress, setIndexAddress } = useContext(MilkContext);

  return (
    <div className={cx("info-address", { border })}>
      <span className={cx("address")}>{children}</span>
      {selectAddress && (
        <div className={cx("btn-action")}>
          <ButtonDefaultAddress />
        </div>
      )}
    </div>
  );
}

export default Address;
