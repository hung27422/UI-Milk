import classNames from "classnames/bind";
import styles from "./WaitConfirm.module.scss";
import ButtonCancelOrder from "./ButtonCancelOrder";
import { useContext, useEffect } from "react";
import { MilkContext } from "~/components/ContextMilk/ContextMilk";
import { gql, useQuery } from "@apollo/client";
import { TableInfoProductWrapperOrder } from "~/components/TableInfoProduct/TableInfoProductWrapper";
const cx = classNames.bind(styles);
function WaitConfirm() {
  const apiTokenLocal = localStorage.getItem("apiToken");
  const { setActiveStepOrder } = useContext(MilkContext);
  useEffect(() => setActiveStepOrder(1), [setActiveStepOrder]);
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
          shippingAddress
          status
          total
          userId
        }
      }
    `,
    {
      variables: { amount: 10, page: 1 },
      context: {
        headers: {
          authorization: `Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiIwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAiLCJuYW1lIjoibnVsbCIsImp0aSI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNjk5NTg4NTYzLCJpc3MiOiJJZldoYXQiLCJhdWQiOiJJZldoYXRDbGllbnQifQ.-CPSL6LvcH6h3EfYnE15reqBQ0qJxckC1nJ2-FR0ZckA2pl34pftHPqP_oT0yk5lakZcTY7vUo9BrTKRsakqDw`,
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
        <TableInfoProductWrapperOrder waitConfirm order={data?.orders} />
      </div>
      <div className={cx("btn-action")}>
        <ButtonCancelOrder />
      </div>
    </div>
  );
}

export default WaitConfirm;
