import { useContext, useEffect } from "react";
import { MilkContext } from "../ContextMilk/ContextMilk";
const userIdLocal = localStorage.getItem("userId");

const { default: TableInfoProduct } = require("./TableInfoProduct");
const TableInfoProductWrapper = () => {
  let total = 0;
  const localStorageCart = JSON.parse(localStorage.getItem("cartItems"));
  return <TableInfoProduct total={total} data={localStorageCart} />;
};
//ListAllOrder
const TableInfoAllOrderWrapper = ({ order }) => {
  const listOrders = order?.filter(
    (items) => items.userId === userIdLocal.toLocaleLowerCase()
  );
  return (
    <TableInfoProduct
      title={"Thông tin tất cả đơn hàng"}
      data={listOrders?.map((i) => i).flat()}
      dataOrder={order?.map((o) => o).flat()}
      showTotalPrice
      status
    />
  );
};
//WaitConfirm
const TableInfoProductWrapperOrder = ({ waitConfirm, order }) => {
  const statusWaitConfirm = order?.filter(
    (items) =>
      items.status === "CREATED" &&
      items.userId === userIdLocal.toLocaleLowerCase()
  );

  if (Array.isArray(statusWaitConfirm) && statusWaitConfirm.length > 0) {
    return (
      <TableInfoProduct
        titleColor
        title={"Thông tin đơn hàng "}
        data={statusWaitConfirm?.map((i) => i).flat()}
        tableStatus={waitConfirm ? "Chờ xác nhận" : ""}
        isShowButtonCancel
      />
    );
  }
};
//ConfirmOrder
const TableInfoConfirmWrapperOrder = ({ confirm, order }) => {
  const statusConfirm = order?.filter(
    (item) =>
      item.status === "CONFIRMED" &&
      item.userId === userIdLocal.toLocaleLowerCase()
  );

  if (Array.isArray(statusConfirm) && statusConfirm.length > 0) {
    return (
      <TableInfoProduct
        title={"Thông tin đơn hàng "}
        data={statusConfirm?.map((i) => i).flat()}
        tableStatus={confirm ? "Đã xác nhận" : ""}
      />
    );
  }
};
//Shipment
const TableInfoShipment = ({ order, shipment }) => {
  const statusShipment = order?.filter(
    (item) =>
      item.status === "SHIPPING" &&
      item.userId === userIdLocal.toLocaleLowerCase()
  );
  if (Array.isArray(statusShipment) && statusShipment.length > 0) {
    return (
      <TableInfoProduct
        title={"Thông tin đơn hàng"}
        data={statusShipment?.map((i) => i).flat()}
        tableStatus={shipment ? "Đang giao" : ""}
        isShowButtonDetailShipment
      />
    );
  }
};
//DELIVEREDOrders
const TableInfoDeliveryOrderWrapperOrder = ({ doneOrder, order }) => {
  const statusDone = order?.filter(
    (item) =>
      item.status === "DELIVERED" &&
      item.userId === userIdLocal.toLocaleLowerCase()
  );
  console.log("Done", statusDone);
  if (Array.isArray(statusDone) && statusDone.length > 0) {
    return (
      <TableInfoProduct
        title={"Thông tin đơn hàng"}
        data={statusDone?.map((i) => i).flat()}
        tableStatus={doneOrder ? "Đã giao" : ""}
        isShowButtonDone
        showTotalPrice
      />
    );
  }
};
//DONEOrders
const TableInfoDoneOrderWrapperOrder = ({ doneOrder, order }) => {
  const statusDone = order?.filter(
    (item) =>
      item.status === "DONE" && item.userId === userIdLocal.toLocaleLowerCase()
  );

  if (Array.isArray(statusDone) && statusDone.length > 0) {
    return (
      <TableInfoProduct
        title={"Thông tin đơn hàng"}
        data={statusDone?.map((i) => i).flat()}
        tableStatus={doneOrder ? "Hoàn thành" : ""}
        showTotalPrice
      />
    );
  }
};
//CANCELLEDOrders
const TableInfoCancelOrderWrapperOrder = ({ cancelOrder, order }) => {
  const statusDone = order?.filter(
    (item) =>
      item.status === "CANCELLED" &&
      item.userId === userIdLocal.toLocaleLowerCase()
  );

  if (Array.isArray(statusDone) && statusDone.length > 0) {
    return (
      <TableInfoProduct
        title={"Thông tin đơn hàng"}
        data={statusDone?.map((i) => i).flat()}
        tableStatus={cancelOrder ? "Đã hủy" : ""}
      />
    );
  }
};
//ListOrder of Guest
const TableInfoListAllOrderWrapperOrderGuest = ({ order }) => {
  const { showOrderGuest } = useContext(MilkContext);
  const listOrders = order?.filter((items) => items.phone === showOrderGuest);
  return (
    <TableInfoProduct
      title={"Thông tin tất cả sản phẩm"}
      data={listOrders?.map((i) => i).flat()}
      dataOrder={order?.map((o) => o).flat()}
      showTotalPrice
      status
    />
  );
};
//WaitConfirm of Guest
const TableInfoProductWrapperOrderGuest = ({ waitConfirm, order }) => {
  const { showOrderGuest } = useContext(MilkContext);
  const statusWaitConfirm = order?.filter(
    (items) => items.status === "CREATED" && items.phone === showOrderGuest
  );

  if (Array.isArray(statusWaitConfirm) && statusWaitConfirm.length > 0) {
    return (
      <TableInfoProduct
        titleColor
        title={"Thông tin sản phẩm "}
        data={statusWaitConfirm?.map((i) => i).flat()}
        tableStatus={waitConfirm ? "Chờ xác nhận" : ""}
      />
    );
  }
};
//ConfirmOrder of Guest
const TableInfoConfirmWrapperOrderGuest = ({ confirm, order }) => {
  const { showOrderGuest } = useContext(MilkContext);
  const statusConfirm = order?.filter(
    (item) => item.status === "CONFIRMED" && item.phone === showOrderGuest
  );
  console.log("Xác nhận", statusConfirm);
  console.log("userId", userIdLocal);
  if (Array.isArray(statusConfirm) && statusConfirm.length > 0) {
    return (
      <TableInfoProduct
        title={"Thông tin sản phẩm "}
        data={statusConfirm?.map((i) => i).flat()}
        tableStatus={confirm ? "Đã xác nhận" : ""}
      />
    );
  }
};
//Shipment of Guest
const TableInfoShipmentGuest = ({ order, shipment }) => {
  const { showOrderGuest } = useContext(MilkContext);
  const statusShipment = order?.filter(
    (item) => item.status === "SHIPPING" && item.phone === showOrderGuest
  );
  if (Array.isArray(statusShipment) && statusShipment.length > 0) {
    return (
      <TableInfoProduct
        title={"Thông tin sản phẩm"}
        data={statusShipment?.map((i) => i).flat()}
        tableStatus={shipment ? "Đang giao" : ""}
        isShowButtonDetailShipment
      />
    );
  }
};
//DELIVEREDOrders of Guest
const TableInfoDeliveryOrderWrapperOrderGuest = ({ doneOrder, order }) => {
  const { showOrderGuest } = useContext(MilkContext);
  const statusDone = order?.filter(
    (item) => item.status === "DELIVERED" && item.phone === showOrderGuest
  );
  console.log("Done", statusDone);
  if (Array.isArray(statusDone) && statusDone.length > 0) {
    return (
      <TableInfoProduct
        title={"Thông tin đơn hàng"}
        data={statusDone?.map((i) => i).flat()}
        tableStatus={doneOrder ? "Đã giao" : ""}
        isShowButtonDone
        showTotalPrice
      />
    );
  }
};
//DONEOrders of Guest
const TableInfoDoneOrderWrapperOrderGuest = ({ doneOrder, order }) => {
  const { showOrderGuest } = useContext(MilkContext);
  const statusDone = order?.filter(
    (item) => item.status === "DONE" && item.phone === showOrderGuest
  );
  console.log("Done", statusDone);
  if (Array.isArray(statusDone) && statusDone.length > 0) {
    return (
      <TableInfoProduct
        title={"Thông tin đơn hàng"}
        data={statusDone?.map((i) => i).flat()}
        tableStatus={doneOrder ? "Hoàn thành" : ""}
        showTotalPrice
      />
    );
  }
};
//CANCELLEDOrders of Guest
const TableInfoCancelOrderWrapperOrderGuest = ({ cancelOrder, order }) => {
  const { showOrderGuest } = useContext(MilkContext);
  const statusDone = order?.filter(
    (item) => item.status === "CANCELLED" && item.phone === showOrderGuest
  );
  if (Array.isArray(statusDone) && statusDone.length > 0) {
    return (
      <TableInfoProduct
        title={"Thông tin đơn hàng"}
        data={statusDone?.map((i) => i).flat()}
        tableStatus={cancelOrder ? "Đã hủy" : ""}
      />
    );
  }
};
export {
  TableInfoProductWrapper,
  TableInfoProductWrapperOrder,
  TableInfoAllOrderWrapper,
  TableInfoConfirmWrapperOrder,
  TableInfoDeliveryOrderWrapperOrder,
  TableInfoShipment,
  TableInfoDoneOrderWrapperOrder,
  TableInfoCancelOrderWrapperOrder,
  TableInfoListAllOrderWrapperOrderGuest,
  TableInfoProductWrapperOrderGuest,
  TableInfoConfirmWrapperOrderGuest,
  TableInfoShipmentGuest,
  TableInfoDeliveryOrderWrapperOrderGuest,
  TableInfoDoneOrderWrapperOrderGuest,
  TableInfoCancelOrderWrapperOrderGuest,
};
