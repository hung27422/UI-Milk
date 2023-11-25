import classNames from "classnames/bind";
import styles from "../WaitConfirm/WaitConfirm.module.scss";
import { useContext, useEffect } from "react";
import { MilkContext } from "~/components/ContextMilk/ContextMilk";
import { gql, useQuery } from "@apollo/client";
import {
  TableInfoConfirmWrapperOrder,
  TableInfoConfirmWrapperOrderGuest,
} from "~/components/TableInfoProduct/TableInfoProductWrapper";
import { useAuth0 } from "@auth0/auth0-react";
const cx = classNames.bind(styles);
function ConfirmOrder() {
  const { setActiveStepOrder } = useContext(MilkContext);
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => setActiveStepOrder(2), [setActiveStepOrder]);
  const apiTokenLocal = localStorage.getItem("apiToken");
  const { data, error } = useQuery(
    gql`
      query FindOrders(
        $query: orderGetOrderInput!
        $amount: Int!
        $page: Int!
      ) {
        findOrders(query: $query, amount: $amount, page: $page) {
          cancelReason
          date
          id
          items {
            id
            name
            orderId
            price
            productId
            quantity
            sku
            subtotal
          }
          phone
          shippingAddress
          status
          total
          userId
          userName
        }
      }
    `,
    {
      variables: {
        query: {
          status: "CONFIRMED",
        },
        page: 1,
        amount: 50,
      },
      context: {
        headers: {
          authorization: `Bearer ${apiTokenLocal}`,
        },
      },
      fetchPolicy: "no-cache",
    }
  );

  useEffect(() => {
    if (error) {
      console.log(error);
    }
    if (data) {
      console.log("data", data);
    }
  }, [data, error]);
  if (!isAuthenticated) {
    return (
      <div className={cx("wrapper")}>
        <TableInfoConfirmWrapperOrderGuest order={data?.findOrders} />
      </div>
    );
  }
  return (
    <div className={cx("wrapper")}>
      <div>
        <TableInfoConfirmWrapperOrder confirm order={data?.findOrders} />
      </div>
    </div>
  );
}

export default ConfirmOrder;
