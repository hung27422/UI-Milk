import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import classNames from "classnames/bind";
import styles from "./LocationUser.module.scss";
import { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect } from "react";
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
const UPDATE_ADDRESS = gql`
  mutation UpdateAddress(
    $input: userUpdateAddressInput!
    $updateAddressId: Int!
  ) {
    updateAddress(input: $input, id: $updateAddressId) {
      addressCreatedPayload {
        message
      }
    }
  }
`;
export default function ButtonUpdateAddress({ idAddress }) {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [updateAddress, { error }] = useMutation(UPDATE_ADDRESS);
  if (error) {
    console.log("Lỗi update địa chỉ", error);
  }
  const [value, setValue] = useState({});
  const handleUpdateAddress = (id, value) => {
    setOpen(true);
    setValue((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  const handleSaveAddress = async (item) => {
    const userUpdateAddressInput = {
      input: {
        city: value?.city || item?.city,
        detail: value?.detail || item?.detail,
        district: value?.district || item?.district,
        ward: value?.ward || item?.ward,
        name: value?.name || item?.name,
        phone: value?.phone || item?.phone,
      },
      updateAddressId: idAddress,
    };
    const result = await updateAddress({
      context: {
        headers: {
          authorization: `Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiJmODhlZGFlOS1mNzhiLTQ2YTEtOTNmMC0yYTdjMmQwOTViMGMiLCJuYW1lIjoiVOG6pW4gSMO5bmcgSOG7kyIsImp0aSI6IkY4OEVEQUU5LUY3OEItNDZBMS05M0YwLTJBN0MyRDA5NUIwQyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNzAxNDI0MTQ3LCJpc3MiOiJJZldoYXQiLCJhdWQiOiJJZldoYXRDbGllbnQifQ.CKLeKzIf2wbQJchx-L285WcBrT6lVRjIlQ76IOMfsSNYZT9zuiZQe48XeDHz7_4m1yx9OS3OQB0ZuksihMtPkg`,
        },
      },
      variables: {
        input: userUpdateAddressInput.input,
        updateAddressId: userUpdateAddressInput.updateAddressId,
      },
    });
    console.log("Cập nhật địa chỉ thành công:", result);
    setOpen(false);
  };
  const { data } = useQuery(
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
        amount: 12,
        page: 1,
      },
    }
  );
  // useEffect(() => {
  //   console.log(data?.addresses);
  // }, [data]);
  return (
    <div>
      <Button onClick={handleUpdateAddress}>Cập nhật</Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {data?.addresses.map((item, index) => {
            if (item?.id === idAddress) {
              return (
                <div key={index}>
                  <h2 style={{ color: "var(--text-color)" }}>
                    Cập nhật địa chỉ
                  </h2>
                  <div className={cx("user-box")}>
                    <TextField
                      className={cx("input-user")}
                      id="name"
                      label={item?.name}
                      onChange={(e) =>
                        handleUpdateAddress("name", e.target.value)
                      }
                      variant="outlined"
                    />
                    <TextField
                      className={cx("input-user")}
                      id="phone"
                      label={item?.phone}
                      onChange={(e) =>
                        handleUpdateAddress(
                          "phone",
                          e.target.value,
                          item?.phone
                        )
                      }
                      variant="outlined"
                    />
                  </div>
                  <div className={cx("address-box")}>
                    <TextField
                      className={cx("input-address")}
                      id="city"
                      label={item?.city}
                      onChange={(e) =>
                        handleUpdateAddress("city", e.target.value)
                      }
                      variant="outlined"
                    />
                    <TextField
                      className={cx("input-address")}
                      id="district"
                      label={item?.district}
                      onChange={(e) =>
                        handleUpdateAddress(
                          "district",
                          e.target.value,
                          item?.district
                        )
                      }
                      variant="outlined"
                    />{" "}
                    <TextField
                      className={cx("input-address")}
                      id="ward"
                      label={item?.ward}
                      onChange={(e) =>
                        handleUpdateAddress("ward", e.target.value)
                      }
                      variant="outlined"
                    />
                    <TextField
                      className={cx("input-address")}
                      id="detail"
                      label={item?.detail}
                      onChange={(e) =>
                        handleUpdateAddress("detail", e.target.value)
                      }
                      variant="outlined"
                    />
                  </div>
                  <div className={cx("btn-action-address")}>
                    <Button
                      style={{
                        border: "1px solid var(--secondary)",
                        width: "80px",
                      }}
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
                      onClick={() => handleSaveAddress(item)}
                    >
                      Lưu
                    </Button>
                  </div>
                </div>
              );
            }
          })}
        </Box>
      </Modal>
    </div>
  );
}
