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
      showTotalPrice
      status
    />
  );
};
//WaitConfirm
const TableInfoProductWrapperOrder = ({ waitConfirm, order }) => {
  return (
    <TableInfoProduct
      titleColor
      title={"Thông tin sản phẩm chờ xác nhận"}
      data={order?.map((i) => i.items).flat()}
      tableStatus={waitConfirm ? "Chờ xác nhận" : ""}
    />
  );
};
//ConfirmOrder
const TableInfoConfirmWrapperOrder = ({ confirm, order }) => {
  return (
    <TableInfoProduct
      title={"Thông tin sản phẩm đã xác nhận"}
      data={order?.map((i) => i.items).flat()}
      tableStatus={confirm ? "Đã xác nhận" : ""}
    />
  );
};
//ConfirmOrder
const TableInfoDoneOrderWrapperOrder = ({ doneOrder, order }) => {
  return (
    <TableInfoProduct
      title={"Thông tin sản phẩm đã giao"}
      data={order?.map((i) => i.items).flat()}
      tableStatus={doneOrder ? "Đã giao" : ""}
    />
  );
};

export {
  TableInfoProductWrapper,
  TableInfoProductWrapperOrder,
  TableInfoAllOrderWrapper,
  TableInfoConfirmWrapperOrder,
  TableInfoDoneOrderWrapperOrder,
};
