import classNames from "classnames/bind";
import styles from "./WaitConfirm.module.scss";
import TableInfoProduct from "~/components/TableInfoProduct/TableInfoProduct";
import ButtonCancelOrder from "./ButtonCancelOrder";
import { useContext, useEffect } from "react";
import { MilkContext } from "~/components/ContextMilk/ContextMilk";
import { gql, useQuery } from "@apollo/client";
const cx = classNames.bind(styles);
function WaitConfirm() {
  const apiTokenLocal = localStorage.getItem("apiToken");
  console.log(apiTokenLocal);
  const { data, error } = useQuery(
    gql`
      query Orders($amount: Int!, $offset: Int!) {
        orders(amount: $amount, offset: $offset) {
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
            order {
              id
            }
          }
          shippingAddress
          status
          total
          userId
        }
      }
    `,
    {
      variables: { amount: 10, offset: 0 },
    },
    {
      context: {
        headers: {
          authorization: `Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiIwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAiLCJuYW1lIjoibnVsbCIsImp0aSI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNjk5MTAyODQ0LCJpc3MiOiJJZldoYXQiLCJhdWQiOiJJZldoYXRDbGllbnQifQ.SO3wx9k88HhlCA_J6sVORj31yhkak8CCp-TPly15vfsn9rtq49kkYMgp8kEaT52qGI1p3thLDmBtt-y63CPMrA`,
        },
      },
    }
  );
  useEffect(() => {
    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
    }
  }, [data, error]);
  const { setActiveStepOrder } = useContext(MilkContext);
  useEffect(() => setActiveStepOrder(0), [setActiveStepOrder]);
  return (
    <div className={cx("wrapper")}>
      <div>
        <TableInfoProduct waitConfirm />
      </div>
      <div className={cx("btn-action")}>
        <ButtonCancelOrder />
      </div>
    </div>
  );
}

export default WaitConfirm;
