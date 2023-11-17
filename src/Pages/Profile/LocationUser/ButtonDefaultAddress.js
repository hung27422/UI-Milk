import { gql, useQuery } from "@apollo/client";
import { Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { MilkContext } from "~/components/ContextMilk/ContextMilk";

function ButtonDefaultAddress({ idAddress }) {
  const { indexAddress, setIndexAddress } = useContext(MilkContext);
  const [addresses, setAddresses] = useState(indexAddress);
  const storedData = JSON.parse(localStorage.getItem("addressesData"));

  useEffect(() => {
    setAddresses(indexAddress);
  }, [indexAddress]);

  const handleDefaultAddress = (id, item) => {
    localStorage.setItem("defaultAddressID", id);
    const updatedAddresses = [item, ...addresses.filter((a) => a !== item)];
    setAddresses(updatedAddresses);
    localStorage.setItem("addressesData", JSON.stringify(updatedAddresses));
    const storedData = JSON.parse(localStorage.getItem("addressesData"));
    setIndexAddress(storedData);
  };

  return (
    <div>
      {indexAddress.map((item) => {
        if (item?.id === idAddress) {
          return (
            <Button
              style={{
                backgroundColor:
                  storedData[0].id === idAddress ? "#ccc" : "var(--secondary)",
                color: "var(--white)",
              }}
              disabled={storedData[0].id === idAddress}
              onClick={() => handleDefaultAddress(item?.id, item)}
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
