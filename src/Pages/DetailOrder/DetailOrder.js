import classNames from "classnames/bind";
import styles from "./DetailOrder.module.scss";
import DetailOrderStep from "./DetailOrderStep/DetailOrderStep";
import WaitConfirm from "./components/WaitConfirm/WaitConfirm";
import MenuDetailOrder from "./components/MenuDetailOrder/MenuDetailOrder";
import ListAllOrder from "./components/ListAllOrder/ListAllOrder";
import DoneOrder from "./components/ConfirmDoneOrder/ConfirmDoneOrder";
import { useContext, useEffect, useState } from "react";
import Shipment from "./components/Shipment/Shipment";
import ConfirmOrder from "./components/ConfirmOrder/ConfirmOrder";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, TextField } from "@mui/material";
import { MilkContext } from "~/components/ContextMilk/ContextMilk";
import configs from "~/configs";
import { useLocation } from "react-router-dom";
const cx = classNames.bind(styles);
function DetailOrder() {
  const [activeID, setActiveId] = useState("1");
  const { isAuthenticated } = useAuth0();
  const { showOrderGuest, setShowOrderGuest } = useContext(MilkContext);
  // const [locationPage, setLocation] = useLocation();
  const handleNextPageOrder = (id) => {
    setActiveId(id);
  };
  const handleShowOrderGuest = (value) => {
    setShowOrderGuest(value);
  };
  // useEffect(() => {
  //   // window.location.href = `${configs.routes.detailorder}`;
  //   if (!window.location.href) {
  //     setShowOrderGuest(null);
  //   }
  // }, [setShowOrderGuest]);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <DetailOrderStep />
      </div>
      {!isAuthenticated && (
        <div className={cx("check-email-guest")}>
          <TextField
            style={{ width: "500px", marginRight: "10px" }}
            id="check-phone"
            label="Nhập số điện thoại để theo dõi đơn hàng"
            variant="outlined"
            onChange={(e) => handleShowOrderGuest(e.target.value)}
          />
          {/* <Button
            style={{
              backgroundColor: "var(--secondary)",
              color: "var(--white)",
            }}
          >
            Xem đơn hàng
          </Button> */}
        </div>
      )}
      <div className={cx("menu")}>
        <MenuDetailOrder
          id={"1"}
          active={activeID}
          title={"Tất cả"}
          onClick={(e) => handleNextPageOrder(e.currentTarget.id)}
        />
        <MenuDetailOrder
          id={"2"}
          active={activeID}
          title={"Chờ xác nhận"}
          onClick={(e) => handleNextPageOrder(e.currentTarget.id)}
        />
        <MenuDetailOrder
          id={"3"}
          active={activeID}
          title={"Đã xác nhận"}
          onClick={(e) => handleNextPageOrder(e.currentTarget.id)}
        />
        <MenuDetailOrder
          id={"4"}
          active={activeID}
          title={"Giao hàng"}
          onClick={(e) => handleNextPageOrder(e.currentTarget.id)}
        />
        <MenuDetailOrder
          id={"5"}
          active={activeID}
          title={"Hoàn thành"}
          onClick={(e) => handleNextPageOrder(e.currentTarget.id)}
        />
      </div>
      <div className={cx("wait-confirm")}>
        {activeID === "1" && <ListAllOrder />}
        {activeID === "2" && <WaitConfirm />}
        {activeID === "3" && <ConfirmOrder />}
        {activeID === "4" && <Shipment />}
        {activeID === "5" && <DoneOrder />}
      </div>
    </div>
  );
}

export default DetailOrder;
