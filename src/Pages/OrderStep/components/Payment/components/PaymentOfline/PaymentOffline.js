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
import useQueryPoint from "~/hooks/useQueryPoint";

const cx = classNames.bind(styles);
const CREATE_ORDER = gql`
  mutation CreateOrder($input: orderCreateOrderInput!) {
    createOrder(input: $input) {
      string
    }
  }
`;
const CREATE_ORDER_GUEST = gql`
  mutation CreateGuestOrder($input: orderCreateGuestOrderInput!) {
    createGuestOrder(input: $input) {
      string
    }
  }
`;
const ADD_POINT = gql`
  mutation AddPoint($input: userAddPointInput!) {
    addPoint(input: $input) {
      string
    }
  }
`;
const SUBTRACT_POINT = gql`
  mutation SubtractPoint($input: userSubtractPointInput!) {
    subtractPoint(input: $input) {
      string
    }
  }
`;
const UPDATE_DISCOUNT = gql`
  mutation UpdateDiscount($input: orderUpdateDiscountInput!) {
    updateDiscount(input: $input) {
      string
    }
  }
`;
function PaymentOffline() {
  let total = 0;
  let totalPrice = 0;
  const { user, isAuthenticated } = useAuth0();
  const { data: dataAddress } = useQueryAddress();
  const [address, setAddress] = useState();
  const { setCartItem } = useContext(MilkContext);
  const { discount } = useContext(MilkContext);
  const storedGuest = JSON.parse(localStorage.getItem("guest"));
  const { isCheckedPoint } = useContext(MilkContext);
  const { inventory } = useContext(MilkContext);
  const { refetch } = useQueryInventories();
  const { data: dataPoint, refetch: refetchPoint } = useQueryPoint();
  const [createGuestOrder, { error }] = useMutation(CREATE_ORDER_GUEST);

  if (error) console.log("Lỗi tạo đơn hàng guest", error);
  const localStorageCart = JSON.parse(localStorage.getItem("cartItems"));
  useEffect(() => {
    if (discount) {
      console.log("dc ne", discount);
    }
  }, [discount]);
  useEffect(() => {
    if (dataAddress && dataAddress.addresses.length > 0) {
      const defaultAddress = dataAddress.addresses.find(
        (item) => item.isDefault === true
      );
      setAddress(defaultAddress);
    }
  }, [address, dataAddress]);
  //Total finally
  if (localStorageCart) {
    localStorageCart.forEach((item) => {
      total += item.total;
    });

    if (discount) {
      total -= discount.amount;
    }
    if (isCheckedPoint && dataPoint) {
      total -= dataPoint.pointByUserId.point;
    }

    // Ensure the total price is not negative
    totalPrice = Math.max(total, 0);
  }
  //Thêm số lượng point
  const handleAddPoint = async (total) => {
    const quantityPoint = total * (0.3 / 100);
    const idPoint = dataPoint?.pointByUserId?.id;
    console.log("quantityPoint", quantityPoint);
    const userAddPointInput = {
      input: {
        input: {
          id: idPoint,
          point: quantityPoint,
        },
      },
    };
    const result = await client.mutate({
      mutation: ADD_POINT,
      variables: {
        input: userAddPointInput.input,
      },
    });
    refetchPoint();
    console.log("ADD_POINT thành công,", result);
  };
  //Trừ hết point
  const handleSubtractPoint = async () => {
    const idPoint = dataPoint?.pointByUserId?.id;
    const point = dataPoint?.pointByUserId?.point;
    const userSubtractPointInput = {
      input: {
        input: {
          id: idPoint,
          point: point,
        },
      },
    };
    const result = await client.mutate({
      mutation: SUBTRACT_POINT,
      variables: {
        input: userSubtractPointInput.input,
      },
    });
    refetchPoint();
    console.log("SUBTRACT_POINT thành công,", result);
  };
  const handleUpdateDiscount = async () => {
    const orderUpdateDiscountInput = {
      input: {
        activeDate: discount?.activeDate,
        amount: discount?.amount,
        code: discount?.code,
        description: discount?.description,
        expireDate: discount?.expireDate,
        id: discount?.id,
        quantity: discount?.quantity - 1,
        type: discount?.type,
      },
    };
    const result = await client.mutate({
      mutation: UPDATE_DISCOUNT,
      variables: {
        input: orderUpdateDiscountInput.input,
      },
    });
    console.log("Cập nhật quantity Discount thành công", result);
  };
  const handleCreateOrder = async () => {
    const apiTokenLocal = localStorage.getItem("apiToken");
    const userIdLocal = localStorage.getItem("userId");

    const total =
      localStorageCart?.reduce((accumulator, item) => {
        return accumulator + (item?.price * item?.quantity || 0);
      }, 0) || 0;
    if (isCheckedPoint) {
      handleSubtractPoint();
    }
    if (total >= 100000) {
      handleAddPoint(total);
    }

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
      total: totalPrice,
      userId: userIdLocal,
      status: "CREATED",
      phone: address?.phone,
      userName: address?.name,
      condition: {
        birthday: discount?.birthdayCondition,
        specialDay: discount?.specialDayCondition,
        total: discount?.totalOverCondition,
      },
      discountCode: discount?.code,
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
      setCartItem([]);
      localStorage.setItem("cartItems", JSON.stringify([]));
      console.log("Đã xóa giỏ hàng");
      refetch();
      if (discount) {
        handleUpdateDiscount();
      }
    }
  };
  const handleCreateOrderGuest = async () => {
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
        total: totalPrice,
        userName: storedGuest?.nameGuest,
        condition: {
          birthday: discount?.birthdayCondition,
          specialDay: discount?.specialDayCondition,
          total: discount?.totalOverCondition,
        },
        discountCode: discount?.code,
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
    if (discount) {
      handleUpdateDiscount();
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("content")}>
        <div className={cx("content-left")}>
          <PriceContent price={totalPrice} />
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
