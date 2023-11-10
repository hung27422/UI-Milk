import { useEffect } from "react";

const { default: TableInfoProduct } = require("./TableInfoProduct");

const TableInfoProductWrapper = () => {
  let total = 0;
  const localStorageCart = JSON.parse(localStorage.getItem("cartItems"));
  return <TableInfoProduct total={total} data={localStorageCart} />;
};
//ListAllOrder
const TableInfoAllOrderWrapper = ({ order }) => {
  return (
    <TableInfoProduct
      title={"Thông tin tất cả sản phẩm"}
      data={order?.map((i) => i.items).flat()}
      dataOrder={order}
      showTotalPrice
      status
    />
  );
};
//WaitConfirm
const TableInfoProductWrapperOrder = ({ waitConfirm, order }) => {
  const statusWaitConfirm = order?.filter(
    (items) => items.status === "CREATED"
  );
  if (Array.isArray(statusWaitConfirm) && statusWaitConfirm.length > 0) {
    return (
      <TableInfoProduct
        titleColor
        title={"Thông tin sản phẩm "}
        data={statusWaitConfirm?.map((i) => i.items).flat()}
        tableStatus={waitConfirm ? "Chờ xác nhận" : ""}
      />
    );
  }
};
//ConfirmOrder
const TableInfoConfirmWrapperOrder = ({ confirm, order }) => {
  const statusConfirm = order?.filter((item) => item.status === "CONFIRMED");
  if (Array.isArray(statusConfirm) && statusConfirm.length > 0) {
    return (
      <TableInfoProduct
        title={"Thông tin sản phẩm "}
        data={statusConfirm?.map((i) => i.items).flat()}
        tableStatus={confirm ? "Đã xác nhận" : ""}
      />
    );
  }
};
//Shipment
const TableInfoShipment = ({ order, shipment }) => {
  const statusShipment = order?.filter((item) => item.status === "SHIPPING");
  if (Array.isArray(statusShipment) && statusShipment.length > 0) {
    return (
      <TableInfoProduct
        title={"Thông tin sản phẩm"}
        data={statusShipment?.map((i) => i.items).flat()}
        tableStatus={shipment ? "Đang giao" : ""}
        isShowButtonDetailShipment
      />
    );
  }
};
//ConfirmOrder
const TableInfoDoneOrderWrapperOrder = ({ doneOrder, order }) => {
  const statusDone = order?.filter((item) => item.status === "SHIPPING");
  if (Array.isArray(statusDone) && statusDone.length > 0) {
    return (
      <TableInfoProduct
        title={"Thông tin sản phẩm"}
        data={statusDone?.map((i) => i.items).flat()}
        tableStatus={doneOrder ? "Đã giao" : ""}
        isShowButtonDone
      />
    );
  }
};

export {
  TableInfoProductWrapper,
  TableInfoProductWrapperOrder,
  TableInfoAllOrderWrapper,
  TableInfoConfirmWrapperOrder,
  TableInfoDoneOrderWrapperOrder,
  TableInfoShipment,
};
