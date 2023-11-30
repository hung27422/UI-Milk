import { useAuth0 } from "@auth0/auth0-react";
const userIdLocal = localStorage.getItem("userId");
const { default: TableInfoProduct } = require("./TableInfoProduct");
const TableInfoProductWrapper = () => {
  let total = 0;
  const localStorageCart = JSON.parse(localStorage.getItem("cartItems"));
  return <TableInfoProduct total={total} data={localStorageCart} />;
};
//ListAllOrder
const TableInfoAllOrderWrapper = ({ order }) => {
  const { user } = useAuth0();
  const listOrders = order?.filter((items) => items?.email === user?.email);
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
  const { user } = useAuth0();
  const statusWaitConfirm = order?.filter((item) => {
    return item?.email === user?.email;
  });

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
  const { user } = useAuth0();
  const statusConfirm = order?.filter((item) => {
    return item?.email === user?.email;
  });

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
  const { user } = useAuth0();
  const statusShipment = order?.filter((item) => {
    return item?.email === user?.email;
  });

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
const TableInfoDeliveryOrderWrapperOrder = ({ deliveredOrder, order }) => {
  const { user } = useAuth0();
  const statusDelivered = order?.filter((item) => {
    return item?.email === user?.email;
  });
  if (Array.isArray(statusDelivered) && statusDelivered.length > 0) {
    return (
      <TableInfoProduct
        title={"Thông tin đơn hàng"}
        data={statusDelivered?.map((i) => i).flat()}
        tableStatus={deliveredOrder ? "Đã giao" : ""}
        isShowButtonDone
        showTotalPrice
      />
    );
  }
};
//DONEOrders
const TableInfoDoneOrderWrapperOrder = ({ doneOrder, order }) => {
  const { user } = useAuth0();
  const statusDone = order?.filter((item) => {
    return item?.email === user?.email;
  });
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
  const { user } = useAuth0();
  const statusCancel = order?.filter((item) => {
    return item?.email === user?.email;
  });

  if (Array.isArray(statusCancel) && statusCancel.length > 0) {
    return (
      <TableInfoProduct
        title={"Thông tin đơn hàng"}
        data={statusCancel?.map((i) => i).flat()}
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
};
