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
  console.log("list", order?.map((o) => o).flat());
  return (
    <TableInfoProduct
      title={"Thông tin tất cả sản phẩm"}
      data={listOrders?.map((i) => i.items).flat()}
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
  console.log("Chờ xác nhận: ", statusWaitConfirm);
  console.log("userId", userIdLocal.toLocaleLowerCase());

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
  const statusConfirm = order?.filter(
    (item) =>
      item.status === "CONFIRMED" &&
      item.userId === userIdLocal.toLocaleLowerCase()
  );
  console.log("Xác nhận", statusConfirm);
  console.log("userId", userIdLocal);
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
  const statusShipment = order?.filter(
    (item) =>
      item.status === "SHIPPING" &&
      item.userId === userIdLocal.toLocaleLowerCase()
  );
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
//DoneOrders ---> Chưa gán status
const TableInfoDoneOrderWrapperOrder = ({ doneOrder, order }) => {
  const statusDone = order?.filter(
    (item) =>
      item.status === "SHIPPING" &&
      item.userId === userIdLocal.toLocaleLowerCase()
  );
  console.log("Done", statusDone);
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
//ListOrder of Guest
const TableInfoListAllOrderWrapperOrderGuest = ({ order }) => {
  const { showOrderGuest } = useContext(MilkContext);
  const listOrders = order?.filter((items) => items.phone === showOrderGuest);
  return (
    <TableInfoProduct
      title={"Thông tin tất cả sản phẩm"}
      data={listOrders?.map((i) => i.items).flat()}
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
        data={statusWaitConfirm?.map((i) => i.items).flat()}
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
        data={statusConfirm?.map((i) => i.items).flat()}
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
        data={statusShipment?.map((i) => i.items).flat()}
        tableStatus={shipment ? "Đang giao" : ""}
        isShowButtonDetailShipment
      />
    );
  }
};
//DoneOrders of Guest ---> Chưa gán status
const TableInfoDoneOrderWrapperOrderGuest = ({ doneOrder, order }) => {
  const { showOrderGuest } = useContext(MilkContext);
  const statusDone = order?.filter(
    (item) => item.status === "SHIPPING" && item.phone === showOrderGuest
  );

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
  TableInfoListAllOrderWrapperOrderGuest,
  TableInfoProductWrapperOrderGuest,
  TableInfoConfirmWrapperOrderGuest,
  TableInfoShipmentGuest,
  TableInfoDoneOrderWrapperOrderGuest,
};
