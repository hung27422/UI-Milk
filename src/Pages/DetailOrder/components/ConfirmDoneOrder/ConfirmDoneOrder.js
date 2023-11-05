import classNames from "classnames/bind";
import styles from "./ConfirmDoneOrder.module.scss";
import DetailOrderStep from "../../DetailOrderStep/DetailOrderStep";
import TableInfoProduct from "~/components/TableInfoProduct/TableInfoProduct";
import Button from "~/components/Button";
import { useContext, useEffect, useState } from "react";
import { MilkContext } from "~/components/ContextMilk/ContextMilk";
import { TableInfoDoneOrderWrapperOrder } from "~/components/TableInfoProduct/TableInfoProductWrapper";
import { gql, useQuery } from "@apollo/client";
const cx = classNames.bind(styles);
function DoneOrder() {
  const { setActiveStepOrder } = useContext(MilkContext);
  useEffect(() => setActiveStepOrder(4), [setActiveStepOrder]);
  const [showButton, setShowButton] = useState(false);
  const handleConfirmOrderDone = () => {
    setShowButton(true);
  };
  const apiTokenLocal = localStorage.getItem("apiToken");
  const { data, error } = useQuery(
    gql`
      query Orders($amount: Int!, $page: Int!) {
        orders(amount: $amount, page: $page) {
          cancelReason
          date
          id
          items {
            id
            order {
              id
            }
            name
            orderId
            price
            productId
            quantity
            sku
            subtotal
          }
        }
      }
    `,
    {
      variables: { amount: 3, page: 1 },
      context: {
        headers: {
          authorization: `Bearer ${apiTokenLocal}`,
        },
      },
    }
  );
  return (
    <div className={cx("wrapper")}>
      {/* <div className={cx("header")}>
        <DetailOrderStep />
      </div> */}
      <div className={cx("done-order")}>
        <TableInfoDoneOrderWrapperOrder doneOrder order={data?.orders} />
        <div className={cx("action-btn")}>
          {!showButton && (
            <Button confirmOrderDone onClick={handleConfirmOrderDone}>
              Đã nhận được hàng
            </Button>
          )}

          {showButton && <Button confirmOrderDone>Mua lại</Button>}
          {showButton && <Button confirmOrderDone>Đánh giá sản phẩm</Button>}
        </div>
      </div>
    </div>
  );
}

export default DoneOrder;
