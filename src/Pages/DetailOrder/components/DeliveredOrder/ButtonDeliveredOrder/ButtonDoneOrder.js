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
            authorization: `Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiI3MWE5NTM0NS03YmYwLTQwMDYtYjBhNi05YmYwODdiZTA4Y2YiLCJuYW1lIjoiSOG7kyBU4bqlbiBIw7luZyIsImp0aSI6IjcxQTk1MzQ1LTdCRjAtNDAwNi1CMEE2LTlCRjA4N0JFMDhDRiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNzAxMDU0NjMxLCJpc3MiOiJJZldoYXQiLCJhdWQiOiJJZldoYXRDbGllbnQifQ.b8bvU_whCazN5PktrXMXiitOD-ggE7bXqB7xag_7E2QwNP2qnk_fv9eTSCVmEUY1EiyNlNcXMsjm8QSA74Hr0g`,
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
