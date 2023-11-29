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
          authorization: `Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiJmODhlZGFlOS1mNzhiLTQ2YTEtOTNmMC0yYTdjMmQwOTViMGMiLCJuYW1lIjoiVOG6pW4gSMO5bmcgSOG7kyIsImp0aSI6IkY4OEVEQUU5LUY3OEItNDZBMS05M0YwLTJBN0MyRDA5NUIwQyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNzAxNDI0MTQ3LCJpc3MiOiJJZldoYXQiLCJhdWQiOiJJZldoYXRDbGllbnQifQ.CKLeKzIf2wbQJchx-L285WcBrT6lVRjIlQ76IOMfsSNYZT9zuiZQe48XeDHz7_4m1yx9OS3OQB0ZuksihMtPkg`,
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
