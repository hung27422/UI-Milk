import { Button } from "@mui/material";

function ButtonDefaultAddress({ idAddress, addresses, setAddresses }) {
  const storedData = JSON.parse(localStorage.getItem("addressesData"));

  const handleDefaultAddress = () => {
    const selectedAddress = addresses.find(
      (address) => address.id === idAddress
    );
    if (!selectedAddress) {
      return;
    }

    const updatedAddresses = [...addresses];
    const indexToRemove = updatedAddresses.findIndex(
      (address) => address.id === idAddress
    );

    if (indexToRemove !== -1) {
      updatedAddresses.splice(indexToRemove, 1);
    }

    updatedAddresses.unshift(selectedAddress);

    // Cập nhật state
    setAddresses(updatedAddresses);
    localStorage.setItem("addressesData", JSON.stringify(updatedAddresses));
  };
  return (
    <Button
      style={{
        backgroundColor:
          storedData && storedData.length > 0 && storedData[0].id === idAddress
            ? "#ccc"
            : "var(--secondary)",
        color: "var(--white)",
      }}
      onClick={handleDefaultAddress}
      disabled={
        storedData && storedData.length > 0 && storedData[0].id === idAddress
      }
    >
      Đặt làm mặc định
    </Button>
  );
}

export default ButtonDefaultAddress;
