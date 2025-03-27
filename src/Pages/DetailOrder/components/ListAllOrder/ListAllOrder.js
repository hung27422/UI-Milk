import classNames from "classnames/bind";
import styles from "../WaitConfirm/WaitConfirm.module.scss";
import { useContext, useEffect } from "react";
import { MilkContext } from "~/components/ContextMilk/ContextMilk";
import { gql, useQuery } from "@apollo/client";
import { TableInfoAllOrderWrapper } from "~/components/TableInfoProduct/TableInfoProductWrapper";
import { useAuth0 } from "@auth0/auth0-react";
import { tokenAdmin } from "~/TokenTestSelenium/token";
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
          authorization: `Bearer ${tokenAdmin}`,
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
