import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";

import classNames from "classnames/bind";
import styles from "../../Delivery.module.scss";
import ButtonChangeAddress from "../ButtonChangeAddress/ButtonChangeAddress";
import Address from "../Address/Address";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { MilkContext } from "~/components/ContextMilk/ContextMilk";
import useQueryUsers from "~/hooks/useQueryUsers";
import useQueryAddress from "~/hooks/useQueryAddress";
import useValidate from "../../../../../../hooks/useValidate";
const cx = classNames.bind(styles);

function TableInfoDelivery({ hiddenButtonAddresses, error }) {
  const { guest, setGuest } = useContext(MilkContext);
  const { isAuthenticated, user } = useAuth0();
  const { data: dataUser, error: errorUser } = useQueryUsers();
  const { data: dataAddress } = useQueryAddress();
  const [address, setAddress] = useState();

  useEffect(() => {
    if (dataAddress && dataAddress.addresses.length > 0) {
      const defaultAddress = dataAddress.addresses.find(
        (item) => item.isDefault === true
      );
      setAddress(defaultAddress);
    }
  }, [dataAddress]);

  if (errorUser) console.log(errorUser);
  const handleGuestNameChange = (value) => {
    setGuest((prev) => ({
      ...prev,
      nameGuest: value,
    }));
  };

  const handleGuestPhoneChange = (value) => {
    setGuest((prev) => ({
      ...prev,
      phoneGuest: value,
    }));
  };

  const handleGuestEmailChange = (value) => {
    setGuest((prev) => ({
      ...prev,
      emailGuest: value,
    }));
  };

  const handleGuestAddressChange = (value) => {
    setGuest((prev) => ({
      ...prev,
      addressGuest: value,
    }));
  };

  useEffect(() => {
    localStorage.setItem("guest", JSON.stringify(guest));
  }, [guest]);

  // const storedGuest = JSON.parse(localStorage.getItem("guest"));
  // if (!storedGuest) {
  //   console.log(123);
  // }

  return (
    <div>
      <h2 className={cx("title")}>Thông tin giao hàng</h2>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell
              style={{ width: "20%", fontSize: "19px", fontWeight: "600" }}
              align="center"
            >
              Tên
            </TableCell>
            <TableCell
              style={{ width: "20%", fontSize: "19px", fontWeight: "600" }}
              align="center"
            >
              Số điện thoại
            </TableCell>
            {!isAuthenticated && (
              <TableCell
                style={{ width: "20%", fontSize: "19px", fontWeight: "600" }}
                align="center"
              >
                Email
              </TableCell>
            )}
            <TableCell
              style={{
                width: !isAuthenticated ? "50%" : "60%",
                fontSize: "19px",
                fontWeight: "600",
              }}
              align="center"
            >
              Địa chỉ
            </TableCell>
          </TableRow>
        </TableHead>
        {isAuthenticated ? (
          <TableBody>
            {dataUser?.users.map((item, index) => {
              if (item?.email === user?.email) {
                return (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center" component="th" scope="row">
                      <span className={cx("user-name")}>{address?.name}</span>
                    </TableCell>
                    <TableCell style={{ padding: "20px" }} align="center">
                      <span className={cx("user-phone")}>{address?.phone}</span>
                    </TableCell>
                    {hiddenButtonAddresses ? (
                      <TableCell align="center">
                        <Address>
                          {address?.detail},{address?.ward},{address?.district},
                          {address?.city}
                        </Address>
                      </TableCell>
                    ) : (
                      <TableCell align="center">
                        <span className={cx("address-content")}>
                          <span className={cx("address-content")}>
                            <Address>
                              {address?.detail},{address?.ward},
                              {address?.district},{address?.city}
                            </Address>
                            <ButtonChangeAddress data={item} />
                          </span>
                        </span>
                      </TableCell>
                    )}
                  </TableRow>
                );
              }
            })}
          </TableBody>
        ) : (
          <>
            <TableBody>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <TextField
                    id="guest-name"
                    label={"Mời nhập tên"}
                    variant="outlined"
                    onChange={(e) => handleGuestNameChange(e.target.value)}
                  />
                </TableCell>
                <TableCell style={{ padding: "20px" }} align="left">
                  <TextField
                    id="guest-phone"
                    label={"Mời nhập số điện thoại"}
                    variant="outlined"
                    onChange={(e) => handleGuestPhoneChange(e.target.value)}
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    id="guest-email"
                    label={"Mời nhập email"}
                    variant="outlined"
                    onChange={(e) => handleGuestEmailChange(e.target.value)}
                  />
                </TableCell>
                <TableCell align="left">
                  <TextField
                    style={{ width: "500px" }}
                    id="guest-address"
                    label={"Mời nhập địa chỉ"}
                    variant="outlined"
                    onChange={(e) => handleGuestAddressChange(e.target.value)}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </>
        )}
      </Table>
      {error && (
        <div
          style={{
            color: "red",
            textAlign: "center",
            marginTop: "20px",
            width: "100%",
            fontSize: "20px",
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
}

export default TableInfoDelivery;
