import { gql, useMutation } from "@apollo/client";
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
function ButtonDeleteAddress({ data }) {
  const storedData = JSON.parse(localStorage.getItem("addressesData"));
  console.log("123", storedData);
  const [deleteAddress, { error }] = useMutation(DELETE_ADDRESS);
  const handleDeleteAllData = () => {
    // Remove all data from localStorage
    localStorage.removeItem("addressesData");
  };
  const handleDeleteAddress = async () => {
    const userDeleteAddressInput = {
      input: {
        id: data,
      },
    };
    const result = await deleteAddress({
      context: {
        headers: {
          authorization: `Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiI0MzgxMzVlOC1lNDgwLTQ5NGQtOTRhNy1kNWJkY2ZkMDdlNmUiLCJuYW1lIjoiTWFjIiwianRpIjoiNDM4MTM1RTgtRTQ4MC00OTRELTk0QTctRDVCRENGRDA3RTZFIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJleHAiOjE2OTk5NDY0MjMsImlzcyI6IklmV2hhdCIsImF1ZCI6IklmV2hhdENsaWVudCJ9.6Ao_mmg8n9QoIZLRHsTOvC34BhFag1Txg5jJx7hcs8zxJvKRf-XWKoi5dRKnaXjwTdc3TPscq-oEvlzQcmpz1g`,
        },
      },
      variables: {
        input: userDeleteAddressInput.input, // Pass the userCreateAddressInput object to the mutation
      },
    });
    const updatedStoredData = storedData.filter(
      (address) => address.id !== data
    );
    localStorage.setItem("addressesData", JSON.stringify(updatedStoredData));
    console.log("Xóa địa chỉ thành công:", result);
  };
  return (
    <div>
      <Button
        onClick={handleDeleteAddress}
        disabled={storedData && storedData[0].id === data}
      >
        Xóa
      </Button>
      {/* <Button onClick={handleDeleteAllData}>123</Button> */}
    </div>
  );
}

export default ButtonDeleteAddress;
