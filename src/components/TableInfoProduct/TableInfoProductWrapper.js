import { useEffect } from "react";

const { default: TableInfoProduct } = require("./TableInfoProduct");

const TableInfoProductWrapper = () => {
  let total = 0;
  const localStorageCart = JSON.parse(localStorage.getItem("cartItems"));

  return <TableInfoProduct total={total} data={localStorageCart} />;
};

const TableInfoProductWrapperOrder = ({ waitConfirm, order }) => {
  console.log(order);
  return (
    <TableInfoProduct
      data={order?.map((i) => i.items).flat()}
      tableStatus={waitConfirm ? "Chờ xác nhận" : ""}
    />
  );
};

export { TableInfoProductWrapper, TableInfoProductWrapperOrder };
