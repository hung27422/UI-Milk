import classNames from "classnames/bind";
import styles from "./DetailOrder.module.scss";
import DetailOrderStep from "./DetailOrderStep/DetailOrderStep";
import WaitConfirm from "./components/WaitConfirm/WaitConfirm";
import MenuDetailOrder from "./components/MenuDetailOrder/MenuDetailOrder";
import ListAllOrder from "./components/ListAllOrder/ListAllOrder";
import DoneOrder from "./components/ConfirmDoneOrder/ConfirmDoneOrder";
import { useState } from "react";
import Shipment from "./components/Shipment/Shipment";
import ConfirmOrder from "./components/ConfirmOrder/ConfirmOrder";
const cx = classNames.bind(styles);
function DetailOrder() {
  const [activeID, setActiveId] = useState("1");
  const handleNextPageOrder = (id) => {
    setActiveId(id);
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <DetailOrderStep />
      </div>
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
