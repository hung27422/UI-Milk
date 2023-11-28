import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import classNames from "classnames/bind";
import styles from "./LocationUser.module.scss";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { MilkContext } from "~/components/ContextMilk/ContextMilk";
const cx = classNames.bind(styles);
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const CREATE_ADDRESS = gql`
  mutation CreateAddress($address: userCreateAddressInput!) {
    createAddress(address: $address) {
      addressCreatedPayload {
        message
      }
    }
  }
`;
export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { indexAddress, setIndexAddress } = useContext(MilkContext);
  const { addressRefetch, setAddressRefetch } = useContext(MilkContext);
  const [value, setValue] = useState({});
  const [createAddress, { error }] = useMutation(CREATE_ADDRESS);
  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);
  const handleAddInfoAddress = (id, value) => {
    setValue((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  const { data: addressUser, refetch: refetchGetAddressUser } = useQuery(
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
    const storedData = JSON.parse(localStorage.getItem("addressesData"));
    setIndexAddress(storedData || addressUser?.addresses || []);
  }, [addressUser, refetchGetAddressUser, setAddressRefetch, setIndexAddress]);
  useEffect(() => {
    setIndexAddress(addressUser?.addresses || []);
    setAddressRefetch(refetchGetAddressUser);
  }, [refetchGetAddressUser, setAddressRefetch, setIndexAddress, addressUser]);
  const handleCreateAddress = async () => {
    const userIdLocal = localStorage.getItem("userId");
    const userCreateAddressInput = {
      address: {
        city: value?.city,
        detail: value?.detail,
        district: value?.district,
        userId: userIdLocal,
        ward: value?.ward,
        name: value?.name,
        phone: value?.phone,
      },
    };

    const result = await createAddress({
      context: {
        headers: {
          authorization: `Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiJmODhlZGFlOS1mNzhiLTQ2YTEtOTNmMC0yYTdjMmQwOTViMGMiLCJuYW1lIjoiVOG6pW4gSMO5bmcgSOG7kyIsImp0aSI6IkY4OEVEQUU5LUY3OEItNDZBMS05M0YwLTJBN0MyRDA5NUIwQyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNzAxNDI0MTQ3LCJpc3MiOiJJZldoYXQiLCJhdWQiOiJJZldoYXRDbGllbnQifQ.CKLeKzIf2wbQJchx-L285WcBrT6lVRjIlQ76IOMfsSNYZT9zuiZQe48XeDHz7_4m1yx9OS3OQB0ZuksihMtPkg`,
        },
      },
      variables: {
        address: userCreateAddressInput.address, // Pass the userCreateAddressInput object to the mutation
      },
    });
    console.log("Thêm địa chỉ thành công", result);
    setIndexAddress(() => [...addressUser?.addresses]);
    refetchGetAddressUser();
    setOpen(false);
  };

  return (
    <div>
      <Button
        style={{ backgroundColor: "var(--secondary)", color: "var(--white)" }}
        onClick={handleOpen}
      >
        Thêm địa chỉ mới
      </Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 style={{ color: "var(--text-color)" }}>Địa chỉ mới</h2>
          <div className={cx("user-box")}>
            <TextField
              className={cx("input-user")}
              id="name"
              label="Nhập họ và tên"
              onChange={(e) => handleAddInfoAddress("name", e.target.value)}
              variant="outlined"
            />
            <TextField
              className={cx("input-user")}
              id="phone"
              label="Nhập số điện thoại"
              onChange={(e) => handleAddInfoAddress("phone", e.target.value)}
              variant="outlined"
            />
          </div>
          <div className={cx("address-box")}>
            <TextField
              className={cx("input-address")}
              id="city"
              label="Tỉnh/Thành phố"
              onChange={(e) => handleAddInfoAddress("city", e.target.value)}
              variant="outlined"
            />
            <TextField
              className={cx("input-address")}
              id="district"
              label="Quận/Huyện"
              onChange={(e) => handleAddInfoAddress("district", e.target.value)}
              variant="outlined"
            />{" "}
            <TextField
              className={cx("input-address")}
              id="ward"
              label="Phường/Xã"
              onChange={(e) => handleAddInfoAddress("ward", e.target.value)}
              variant="outlined"
            />
            <TextField
              className={cx("input-address")}
              id="detail"
              label="Tên đường/Khu phố cụ thể"
              onChange={(e) => handleAddInfoAddress("detail", e.target.value)}
              variant="outlined"
            />
          </div>
          <div className={cx("btn-action-address")}>
            <Button
              style={{ border: "1px solid var(--secondary)", width: "80px" }}
              onClick={handleClose}
            >
              Trở lại
            </Button>
            <Button
              style={{
                backgroundColor: "var(--secondary)",
                color: "var(--white)",
                width: "80px",
              }}
              onClick={handleCreateAddress}
            >
              Tạo
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
