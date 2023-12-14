import classNames from "classnames/bind";
import styles from "../WaitConfirm/WaitConfirm.module.scss";
import { useContext, useEffect } from "react";
import { MilkContext } from "~/components/ContextMilk/ContextMilk";
import { gql, useQuery } from "@apollo/client";
import { TableInfoAllOrderWrapper } from "~/components/TableInfoProduct/TableInfoProductWrapper";
import { useAuth0 } from "@auth0/auth0-react";
const cx = classNames.bind(styles);
function ListAllOrder() {
  const { setActiveStepOrder } = useContext(MilkContext);

  useEffect(() => setActiveStepOrder(0), [setActiveStepOrder]);
  const apiTokenLocal = localStorage.getItem("apiToken");
  const { data, error } = useQuery(
    gql`
      query Orders($amount: Int!, $page: Int!) {
        orders(amount: $amount, page: $page) {
          cancelReason
          date
          id
          shippingAddress
          items {
            id
            name
            orderId
            price
            productId
            quantity
            sku
            subtotal
            Product {
              images
            }
          }
          email
          status
          total
          userId
          phone
          userName
        }
      }
    `,
    {
      variables: { amount: 100, page: 1 },
      context: {
        headers: {
          authorization: `Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiJmODhlZGFlOS1mNzhiLTQ2YTEtOTNmMC0yYTdjMmQwOTViMGMiLCJuYW1lIjoiVOG6pW4gSMO5bmcgSOG7kyIsImp0aSI6IkY4OEVEQUU5LUY3OEItNDZBMS05M0YwLTJBN0MyRDA5NUIwQyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNzAyODI1ODczLCJpc3MiOiJJZldoYXQiLCJhdWQiOiJJZldoYXRDbGllbnQifQ.o5ruNE0RWtXFGb_0xstZHSpIoZHmTy9xBOgusLM-9NYsHlrOCQsAU0xJNEmlNIwnQiapx4dQkrcFefzrJ6NXnw`,
        },
      },
      pollInterval: 5000,
    }
  );

  return (
    <div className={cx("wrapper")}>
      <div>
        <TableInfoAllOrderWrapper order={data?.orders} />
      </div>
    </div>
  );
}

export default ListAllOrder;
