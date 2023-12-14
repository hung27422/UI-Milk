import classNames from "classnames/bind";
import styles from "./WaitConfirm.module.scss";
import Button from "~/components/Button";
import { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import useQueryInventories from "~/hooks/useQueryInventories";
import { client } from "~/ApolloClient";
import useQueryPoint from "~/hooks/useQueryPoint";
const cx = classNames.bind(styles);

const UPDATE_ORDER = gql`
  mutation UpdateOrder($input: orderUpdateOrderInput!) {
    updateOrder(input: $input) {
      string
    }
  }
`;
const UPDATE_INVENTORY = gql`
  mutation UpdateInventory(
    $updateInventoryId: Int!
    $input: inventoryUpdateInventoryInput!
  ) {
    updateInventory(id: $updateInventoryId, input: $input) {
      inventoryUpdatedPayload {
        message
      }
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
const reasons = [
  {
    id: 1,
    name: "Tôi muốn thay đổi địa chỉ",
  },
  {
    id: 2,
    name: "Không muốn đặt hàng nữa",
  },
  {
    id: 3,
    name: "Lí do khác",
  },
];
function ReasonCancel({ data, handleClose }) {
  const [nameReason, setNameReason] = useState();
  const [updateOrder] = useMutation(UPDATE_ORDER);
  const [updateInventory] = useMutation(UPDATE_INVENTORY);
  const [addPoint] = useMutation(ADD_POINT);
  const [reasonId, setReasonId] = useState(1);
  const { data: dataPoint, refetch: refetchPoint } = useQueryPoint();
  const { data: dataInventory, refetch } = useQueryInventories();
  const handleCancelReason = (value, id) => {
    setNameReason(value);
    setReasonId(id);
    const inventoryItem = dataInventory?.inventories?.find((inventory) =>
      data.items.find((item) => inventory.productId === item.productId)
    );
    const dataQuantity = data?.items?.find((item) =>
      dataInventory?.inventories?.find(
        (inventory) => item.productId === inventory.productId
      )
    );
    console.log("inventoryItem", inventoryItem.quantity);
    console.log("quantity", dataQuantity);
  };
  const handleAddPoint = async () => {
    const idPoint = dataPoint?.pointByUserId.id;

    const userAddPointInput = {
      input: {
        input: {
          id: idPoint,
          point: data?.pointDeductionAmount,
        },
      },
    };
    const result = await addPoint({
      variables: {
        input: userAddPointInput.input,
      },
    });
    console.log("Trả point thành công", result);
    refetchPoint();
  };
  const handleCancelOrder = async () => {
    const orderUpdateOrderInput = {
      input: {
        id: data?.id,
        cancelReason: nameReason,
        phone: data?.phone,
        shippingAddress: data?.shippingAddress,
        status: "CANCELLED",
        userName: data?.userName,
      },
    };
    try {
      const result = await updateOrder({
        context: {
          headers: {
            authorization: `Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiJmODhlZGFlOS1mNzhiLTQ2YTEtOTNmMC0yYTdjMmQwOTViMGMiLCJuYW1lIjoiVOG6pW4gSMO5bmcgSOG7kyIsImp0aSI6IkY4OEVEQUU5LUY3OEItNDZBMS05M0YwLTJBN0MyRDA5NUIwQyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNzAyODI1ODczLCJpc3MiOiJJZldoYXQiLCJhdWQiOiJJZldoYXRDbGllbnQifQ.o5ruNE0RWtXFGb_0xstZHSpIoZHmTy9xBOgusLM-9NYsHlrOCQsAU0xJNEmlNIwnQiapx4dQkrcFefzrJ6NXnw`,
          },
        },
        variables: {
          input: orderUpdateOrderInput.input,
        },
      });
      await Promise.all(
        dataInventory?.inventories?.map(async (inventory) => {
          const item = data.items.find(
            (item) => inventory.productId === item.productId
          );

          if (item) {
            const updatedQuantity = inventory?.quantity + item?.quantity;

            await updateInventory({
              variables: {
                updateInventoryId: inventory.id,
                input: {
                  availability: true,
                  quantity: updatedQuantity,
                  // ... other fields you may need to update
                },
              },
              context: {
                headers: {
                  authorization: `Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiJmODhlZGFlOS1mNzhiLTQ2YTEtOTNmMC0yYTdjMmQwOTViMGMiLCJuYW1lIjoiVOG6pW4gSMO5bmcgSOG7kyIsImp0aSI6IkY4OEVEQUU5LUY3OEItNDZBMS05M0YwLTJBN0MyRDA5NUIwQyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNzAyODI1ODczLCJpc3MiOiJJZldoYXQiLCJhdWQiOiJJZldoYXRDbGllbnQifQ.o5ruNE0RWtXFGb_0xstZHSpIoZHmTy9xBOgusLM-9NYsHlrOCQsAU0xJNEmlNIwnQiapx4dQkrcFefzrJ6NXnw`,
                },
              },
            });
          }
        })
      );
      console.log("Đã hủy đơn hàng:", result);
    } catch (error) {
      console.error("Lỗi khi hủy đơn hàng:", error);
    } finally {
      handleClose();
      refetch();
      handleAddPoint();
    }
  };
  return (
    <div className={cx("reason-cancel")}>
      {reasons.map((item) => (
        <div key={item.id} className={cx("form-reason")}>
          <input
            className={cx("input-cancel")}
            name="name"
            type="radio"
            id={item.id}
            checked={item.id === reasonId}
            value={item?.name}
            onChange={(e) => handleCancelReason(e.target.value, item.id)}
          ></input>
          <span className={cx("reason")}>{item.name}</span>
        </div>
      ))}
      <Button selectChoose onClick={handleCancelOrder}>
        Chọn
      </Button>
    </div>
  );
}

export default ReasonCancel;
