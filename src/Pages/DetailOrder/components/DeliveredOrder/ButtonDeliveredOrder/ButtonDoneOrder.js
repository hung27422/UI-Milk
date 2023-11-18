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
            authorization: `Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiI0MzgxMzVlOC1lNDgwLTQ5NGQtOTRhNy1kNWJkY2ZkMDdlNmUiLCJuYW1lIjoiTWFjIiwianRpIjoiNDM4MTM1RTgtRTQ4MC00OTRELTk0QTctRDVCRENGRDA3RTZFIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJleHAiOjE3MDAzODY1MDYsImlzcyI6IklmV2hhdCIsImF1ZCI6IklmV2hhdENsaWVudCJ9.JKWzPcwZIjmehF8A-7QuaVE_hOhP_WkwRTIUXFpHE_vVqQZNzhPYwbynRy1DqbfQPo9BDYwP0fbHbYIsIPnYkg`,
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
