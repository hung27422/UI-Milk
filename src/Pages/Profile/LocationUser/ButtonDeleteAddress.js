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
  const storedData = JSON.parse(localStorage.getItem("addressesData"));

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

  const handleDeleteAddress = async () => {
    const userDeleteAddressInput = {
      input: {
        id: idAddress,
      },
    };
    const result = await deleteAddress({
      context: {
        headers: {
          authorization: `Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiI0MzgxMzVlOC1lNDgwLTQ5NGQtOTRhNy1kNWJkY2ZkMDdlNmUiLCJuYW1lIjoiTWFjIiwianRpIjoiNDM4MTM1RTgtRTQ4MC00OTRELTk0QTctRDVCRENGRDA3RTZFIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJleHAiOjE3MDAzODgwMDUsImlzcyI6IklmV2hhdCIsImF1ZCI6IklmV2hhdENsaWVudCJ9.cPo-rSqvJUZ_LJUZbqI5bziD9g2hPUeRw_Wp389xqqf7i4Cc8XTbgQ-1nOcaD3-ln2izKlvJW_3sG7ovJyp3Eg`,
        },
      },
      variables: {
        input: userDeleteAddressInput.input, // Pass the userCreateAddressInput object to the mutation
      },
    });
    // Nếu mutation thành công, cập nhật trạng thái trong React
    const updatedAddresses = data.addresses.filter(
      (item) => item.id !== idAddress
    );

    // Cập nhật Local Storage với trạng thái mới của danh sách địa chỉ
    localStorage.setItem("addressesData", JSON.stringify(updatedAddresses));
    refetchDeleteAddress();
    console.log("Xóa địa chỉ thành công:", result);
  };
  const hanldeDeleteLocal = () => {
    localStorage.removeItem("addressesData");
  };

  return (
    <div>
      <Button
        disabled={storedData[0].id === idAddress}
        onClick={handleDeleteAddress}
      >
        Xóa
      </Button>
      {/* <Button onClick={hanldeDeleteLocal}>123</Button> */}
    </div>
  );
}

export default ButtonDeleteAddress;
