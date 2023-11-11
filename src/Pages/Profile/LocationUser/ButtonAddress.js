import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import classNames from "classnames/bind";
import styles from "./LocationUser.module.scss";
import { gql, useMutation } from "@apollo/client";
import { useEffect } from "react";
import { useState } from "react";
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
          authorization: `Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiI0MzgxMzVlOC1lNDgwLTQ5NGQtOTRhNy1kNWJkY2ZkMDdlNmUiLCJuYW1lIjoiTWFjIiwianRpIjoiNDM4MTM1RTgtRTQ4MC00OTRELTk0QTctRDVCRENGRDA3RTZFIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJleHAiOjE2OTk5NDY0MjMsImlzcyI6IklmV2hhdCIsImF1ZCI6IklmV2hhdENsaWVudCJ9.6Ao_mmg8n9QoIZLRHsTOvC34BhFag1Txg5jJx7hcs8zxJvKRf-XWKoi5dRKnaXjwTdc3TPscq-oEvlzQcmpz1g`,
        },
      },
      variables: {
        address: userCreateAddressInput.address, // Pass the userCreateAddressInput object to the mutation
      },
    });
    console.log("Đã tạo địa chỉ mới:", result);
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
              Lưu
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
