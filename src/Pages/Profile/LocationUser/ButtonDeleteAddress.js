import { gql, useMutation, useQuery } from "@apollo/client";
import { Button } from "@mui/material";
import { useEffect } from "react";
const DELETE_ADDRESS = gql`
  mutation DeleteAddress($input: userDeleteAddressInput!) {
    deleteAddress(input: $input) {
      addressDeletedPayload {
        message
      }
    }
  }
`;
function ButtonDeleteAddress({ idAddress }) {
  const apiTokenLocal = localStorage.getItem("apiToken");

  const { data, refetch: refetchDeleteAddress } = useQuery(
    gql`
      query Addresses($amount: Int!, $page: Int!) {
        addresses(amount: $amount, page: $page) {
          city
          detail
          district
          id
          name
          phone
          userId
          ward
          isDefault
        }
      }
    `,
    {
      variables: {
        amount: 50,
        page: 1,
      },
    }
  );
  useEffect(() => {
    if (data) {
      console.log(data?.addresses);
    }
  }, [data]);

  const [deleteAddress, { error }] = useMutation(DELETE_ADDRESS);
  if (error) console.log("Lỗi xóa address", error);
  const handleDeleteAddress = async (id) => {
    const userDeleteAddressInput = {
      input: {
        id: id,
      },
    };
    const result = await deleteAddress({
      context: {
        headers: {
          authorization: `Bearer ${apiTokenLocal}`,
        },
      },
      variables: {
        input: userDeleteAddressInput.input,
      },
    });
    console.log("Xóa địa chỉ thành công:", result);
    refetchDeleteAddress();
  };

  return (
    <div>
      {data?.addresses?.map((item) => {
        if (item?.id === idAddress) {
          return (
            <Button
              key={item?.id}
              disabled={item?.isDefault === true}
              onClick={() => handleDeleteAddress(item?.id)}
            >
              Xóa
            </Button>
          );
        }
      })}
    </div>
  );
}

export default ButtonDeleteAddress;
