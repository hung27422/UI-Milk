import { useState } from "react";
import classNames from "classnames/bind";
import styles from "../ConfirmDoneOrder.module.scss";
import { gql, useMutation } from "@apollo/client";
import useQueryFindOrder from "~/hooks/useQueryFindOrder";
import { Button } from "@mui/material";
const cx = classNames.bind(styles);

const UPDATE_ORDER = gql`
  mutation FinishOrder($input: orderFinishOrderInput!) {
    finishOrder(input: $input) {
      string
    }
  }
`;
function ButtonDoneOrder({ data }) {
  const [showButton, setShowButton] = useState(false);
  const { refetch } = useQueryFindOrder({ status: "DONE" });
  const apiTokenLocal = localStorage.getItem("apiToken");
  const [update_order] = useMutation(UPDATE_ORDER);
  const handleConfirmOrderDone = () => {
    setShowButton(true);
    const orderFinishOrderInput = {
      input: {
        id: data?.id,
      },
    };
    try {
      const result = update_order({
        context: {
          headers: {
            authorization: `Bearer ${apiTokenLocal}`,
          },
        },
        variables: {
          input: orderFinishOrderInput.input,
        },
      });
      refetch();
      console.log("Đã update đơn hàng:", result);
    } catch (error) {
      console.error("Lỗi khi update đơn hàng:", error);
    }
  };

  return (
    <div>
      {!showButton && (
        <div className={cx("action-btn")}>
          <Button
            style={{
              backgroundColor: "var(--secondary)",
              color: "var(--white)",
            }}
            onClick={handleConfirmOrderDone}
          >
            Đã nhận được hàng
          </Button>
        </div>
      )}
    </div>
  );
}

export default ButtonDoneOrder;
