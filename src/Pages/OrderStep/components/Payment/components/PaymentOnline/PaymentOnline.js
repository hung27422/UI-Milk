import classNames from "classnames/bind";
import styles from "./PaymentOnline.module.scss";
import PriceContent from "./PriceContent";
import { useEffect, useState } from "react";
import PayPal from "../PayPalCheckout/PayPal";
import { gql, useQuery } from "@apollo/client";

const cx = classNames.bind(styles);
function PaymentOnline() {
  const localStorageCart = JSON.parse(localStorage.getItem("cartItems"));
  const [showPayment, setShowPayment] = useState(false);
  const apiTokenLocal = localStorage.getItem("apiToken");
  // console.log(apiTokenLocal);
  const { data } = useQuery(
    gql`
      query Orders {
        orders {
          date
          id
          shippingAddress
          status
          userId
        }
      }
    `,
    {
      context: {
        headers: {
          authorization: `Bearer ${apiTokenLocal}`,
        },
      },
    }
  );
  useEffect(() => {
    console.log(data);
  }, [data]);
  let total = 0;
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPayment(true);
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("payment-online")}>
        <div className={cx("content-left")}>
          <h2 className={cx("title-payment")}>Thông tin thanh toán</h2>
          {localStorageCart.forEach((item) => {
            total = total + item.total;
          })}
          {showPayment && (
            <div style={{ width: "300px", height: "40px" }}>
              <PayPal amount={total} />
            </div>
          )}
        </div>
        <div className={cx("content-right")}>
          <PriceContent price={total} />
        </div>
      </div>
    </div>
  );
}

export default PaymentOnline;
