import { useState } from "react";
import classNames from "classnames/bind";
import styles from "../ConfirmDoneOrder.module.scss";
import Button from "~/components/Button";
import { gql, useMutation } from "@apollo/client";
const cx = classNames.bind(styles);

const UPDATE_ORDER = gql`
  mutation UpdateOrder($updateOrderId: Int!, $input: orderUpdateOrderInput!) {
    updateOrder(id: $updateOrderId, input: $input) {
      orderCreatedPayload {
        message
      }
    }
  }
`;
function ButtonDoneOrder({ data }) {
  const [showButton, setShowButton] = useState(false);
  const [update_order] = useMutation(UPDATE_ORDER);
  const handleConfirmOrderDone = () => {
    setShowButton(true);
    const orderUpdateOrderInput = {
      updateOrderId: data?.id,
      input: {
        cancelReason: null,
        phone: data?.phone,
        shippingAddress: data?.shippingAddress,
        status: "DONE",
        userName: data?.userName,
      },
    };
    try {
      const result = update_order({
        context: {
          headers: {
            authorization: `Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiI5ZmFkYWI2Ni02YzlmLTQ3MzgtOTU1NC04OTUwYTg2Mzg5ODEiLCJuYW1lIjoiYWRtaW4iLCJqdGkiOiI5RkFEQUI2Ni02QzlGLTQ3MzgtOTU1NC04OTUwQTg2Mzg5ODEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImV4cCI6MTcwMDczODA5NiwiaXNzIjoiSWZXaGF0IiwiYXVkIjoiSWZXaGF0Q2xpZW50In0._JL6OR_9ll0F34MzHyLU64TMpBIQkwrXZpviB96qeiQjqn4xpINoDVffawc7KvWfculfcW_fHiGV4tJRIkgL8g`,
          },
        },
        variables: {
          updateOrderId: orderUpdateOrderInput.updateOrderId,
          input: orderUpdateOrderInput.input,
        },
      });
      console.log("Đã update đơn hàng:", result);
    } catch (error) {
      console.error("Lỗi khi update đơn hàng:", error);
    }
  };

  return (
    <div>
      {!showButton && (
        <div className={cx("action-btn")}>
          <Button confirmOrderDone onClick={handleConfirmOrderDone}>
            Đã nhận được hàng
          </Button>
        </div>
      )}

      {showButton && (
        <div className={cx("action-btn")}>
          <Button confirmOrderDone>Mua lại</Button>
        </div>
      )}
      {showButton && (
        <div className={cx("action-btn")}>
          <Button confirmOrderDone>Đánh giá sản phẩm</Button>
        </div>
      )}
    </div>
  );
}

export default ButtonDoneOrder;
