import classNames from "classnames/bind";
import styles from "./WaitConfirm.module.scss";
import Button from "~/components/Button";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { dark } from "@mui/material/styles/createPalette";
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
const reasons = [
  {
    id: 1,
    name: "Tôi muốn thay đổi địa chỉ",
  },
  {
    id: 2,
    name: "Không muốn đặt hàng nữa",
  },
  {
    id: 3,
    name: "Lí do khác",
  },
];
function ReasonCancel({ data, handleClose }) {
  const [nameReason, setNameReason] = useState("");
  const [updateOrder] = useMutation(UPDATE_ORDER);

  const handleValue = (value) => {
    setNameReason(value);
  };
  const handleCancelOrder = () => {
    console.log(data);
    const orderUpdateOrderInput = {
      updateOrderId: data?.id,
      input: {
        cancelReason: nameReason,
        phone: data?.phone,
        shippingAddress: data?.shippingAddress,
        status: "CANCELLED",
        userName: data?.userName,
      },
    };
    try {
      const result = updateOrder({
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
      console.log("Đã hủy đơn hàng:", result);
    } catch (error) {
      console.error("Lỗi khi hủy đơn hàng:", error);
    } finally {
      handleClose();
    }
  };
  return (
    <div className={cx("reason-cancel")}>
      {reasons.map((item) => (
        <div key={item.id} className={cx("form-reason")}>
          <input
            id={item.id}
            type="radio"
            name="name"
            value={item.name}
            onChange={(e) => handleValue(e.target.value)}
          />
          <span className={cx("reason")}>{item.name}</span>
        </div>
      ))}
      <Button selectChoose onClick={handleCancelOrder}>
        Chọn
      </Button>
    </div>
  );
}

export default ReasonCancel;
