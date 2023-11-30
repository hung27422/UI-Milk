import classNames from "classnames/bind";
import styles from "./PaymentOffline.module.scss";
import PriceContent from "../PaymentOnline/PriceContent";
import ButtonPayment from "../ButtonPayment/ButtonPayment";
import { gql, useMutation } from "@apollo/client";
import { client } from "~/ApolloClient";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useEffect, useState } from "react";
import { MilkContext } from "~/components/ContextMilk/ContextMilk";
import useQueryInventories from "~/hooks/useQueryInventories";
import useQueryAddress from "~/hooks/useQueryAddress";

const cx = classNames.bind(styles);
const CREATE_ORDER = gql`
  mutation CreateOrder($input: orderCreateOrderInput!) {
    createOrder(input: $input) {
      orderCreatedPayload {
        message
      }
    }
  }
`;
const CREATE_ORDER_GUEST = gql`
  mutation CreateGuestOrder($input: orderCreateGuestOrderInput!) {
    createGuestOrder(input: $input) {
      orderCreatedPayload {
        message
      }
    }
  }
`;
function PaymentOffline() {
  const { user, isAuthenticated } = useAuth0();
  const { data: dataAddress } = useQueryAddress();
  const [address, setAddress] = useState();
  const { cartItem, setCartItem } = useContext(MilkContext);

  const { guest, setGuest } = useContext(MilkContext);
  const storedGuest = JSON.parse(localStorage.getItem("guest"));

  const { inventory } = useContext(MilkContext);
  const { refetch } = useQueryInventories();
  const [createGuestOrder, { error }] = useMutation(CREATE_ORDER_GUEST);
  if (error) console.log("Lỗi tạo đơn hàng guest", error);
  const localStorageCart = JSON.parse(localStorage.getItem("cartItems"));
  useEffect(() => {
    if (dataAddress && dataAddress.addresses.length > 0) {
      const defaultAddress = dataAddress.addresses.find(
        (item) => item.isDefault === true
      );
      setAddress(defaultAddress);
    }
  }, [address, dataAddress]);
  let total = 0;
  const handleCreateOrder = async () => {
    const apiTokenLocal = localStorage.getItem("apiToken");
    const userIdLocal = localStorage.getItem("userId");
    const total =
      localStorageCart?.reduce((accumulator, item) => {
        return accumulator + (item?.price * item?.quantity || 0);
      }, 0) || 0;
    console.log(total);
    const orderCreateOrderInput = {
      email: user?.email,
      items: [
        ...localStorageCart?.map((i) => ({
          name: i?.name,
          price: i?.price,
          productId: i?.id,
          quantity: i?.quantity,
          sku: i?.sku,
        })),
      ],
      shippingAddress: `${address?.detail},${address?.ward},${address?.district},${address?.city}`,
      total: total,
      userId: userIdLocal,
      status: "CREATED",
      phone: address?.phone,
      userName: address?.name,
    };

    try {
      const result = await client.mutate({
        mutation: CREATE_ORDER,
        context: {
          headers: {
            authorization: `Bearer ${apiTokenLocal}`,
          },
        },
        variables: {
          input: orderCreateOrderInput,
        },
      });
      localStorageCart?.forEach((item) => {
        const inventoryItem = inventory?.find(
          (inventory) => inventory.id === item.idInventory
        );
        if (inventoryItem) {
          const updatedQuantity = inventoryItem.quantity - item.quantity;
          inventoryItem.quantity = updatedQuantity;
        }
      });
      console.log("Đã tạo đơn hàng:", result);

      localStorage.removeItem("cartItems");
    } catch (error) {
      console.error("Lỗi khi tạo đơn hàng:", error);
    } finally {
      //"Refetch"
      const updatedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      console.log("Đã xóa giỏ hàng");
      refetch();
    }
  };
  const handleCreateOrderGuest = async () => {
    console.log(storedGuest);
    const orderCreateGuestOrderInput = {
      input: {
        email: storedGuest?.emailGuest,
        items: [
          ...localStorageCart?.map((i) => ({
            name: i?.name,
            price: i?.price,
            productId: i?.id,
            quantity: i?.quantity,
            sku: i?.sku,
          })),
        ],
        phone: storedGuest?.phoneGuest,
        shippingAddress: storedGuest?.addressGuest,
        status: "CREATED",
        total: total,
        userName: storedGuest?.nameGuest,
      },
    };
    const result = await createGuestOrder({
      variables: { input: orderCreateGuestOrderInput.input },
    });
    localStorageCart?.forEach((item) => {
      const inventoryItem = inventory?.find(
        (inventory) => inventory.id === item.idInventory
      );
      if (inventoryItem) {
        const updatedQuantity = inventoryItem.quantity - item.quantity;
        inventoryItem.quantity = updatedQuantity;
      }
    });
    setCartItem([]);
    console.log("Tạo đơn hàng guest thành công", result);
    localStorage.setItem("cartItems", JSON.stringify([]));
    console.log("Đã xóa giỏ hàng");
    refetch();
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("content")}>
        <div className={cx("content-left")}>
          {localStorageCart.forEach((item) => {
            total = total + item.total;
          })}
          <PriceContent price={total} />
        </div>
        <div className={cx("content-right")}>
          <span className={cx("title")}>Thanh toán khi nhận hàng: </span>
          <span className={cx("description")}>
            Phí thu hộ: ₫0 VNĐ. Ưu đãi về phí vận chuyển (nếu có) áp dụng cả với
            phí thu hộ.
          </span>
        </div>
      </div>
      <div className={cx("btn-action")}>
        {isAuthenticated ? (
          <ButtonPayment onClick={handleCreateOrder} />
        ) : (
          <ButtonPayment onClick={handleCreateOrderGuest}></ButtonPayment>
        )}
      </div>
    </div>
  );
}

export default PaymentOffline;
