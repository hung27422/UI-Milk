import classNames from "classnames/bind";
import styles from "../WaitConfirm/WaitConfirm.module.scss";
import { useContext, useEffect } from "react";
import { MilkContext } from "~/components/ContextMilk/ContextMilk";
import { gql, useQuery } from "@apollo/client";
import { TableInfoConfirmWrapperOrder } from "~/components/TableInfoProduct/TableInfoProductWrapper";
const cx = classNames.bind(styles);
function ConfirmOrder() {
  const { setActiveStepOrder } = useContext(MilkContext);
  useEffect(() => setActiveStepOrder(2), [setActiveStepOrder]);
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
  // useEffect(() => {
  //   if (error) {
  //     console.log(error);
  //   }
  //   if (data) {
  //     console.log(data);
  //   }
  // }, [data, error]);

  return (
    <div className={cx("wrapper")}>
      <div>
        <TableInfoConfirmWrapperOrder confirm order={data?.orders} />
      </div>
    </div>
  );
}

export default ConfirmOrder;
