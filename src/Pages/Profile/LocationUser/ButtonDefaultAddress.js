import { gql, useMutation, useQuery } from "@apollo/client";
import { Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { MilkContext } from "~/components/ContextMilk/ContextMilk";

const DEFAULT_ADDRESS = gql`
  mutation UpdateDefaultAddress($input: userUpdateDefaultAddressInput!) {
    updateDefaultAddress(input: $input) {
      addressUpdatedPayload {
        message
      }
    }
  }
`;
function ButtonDefaultAddress({ idAddress }) {
  const { data, refetch } = useQuery(
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
  const [defaultAddress] = useMutation(DEFAULT_ADDRESS);
  const storedData = JSON.parse(localStorage.getItem("addressesData"));

  const handleDefaultAddress = async (id) => {
    const userUpdateDefaultAddressInput = {
      input: {
        id: id,
      },
    };
    const result = await defaultAddress({
      variables: {
        input: userUpdateDefaultAddressInput.input,
      },
    });
    console.log("UpdateDefaultAddress Success", result);
    refetch();
  };

  return (
    <div>
      {data?.addresses.map((item) => {
        if (item?.id === idAddress) {
          return (
            <Button
              key={item?.id}
              style={{
                backgroundColor:
                  item?.isDefault === true ? "#ccc" : "var(--secondary)",
                color: "var(--white)",
              }}
              disabled={item?.isDefault === true}
              onClick={() => handleDefaultAddress(item?.id)}
            >
              Đặt làm mặc định
            </Button>
          );
        }
      })}
    </div>
  );
}

export default ButtonDefaultAddress;
