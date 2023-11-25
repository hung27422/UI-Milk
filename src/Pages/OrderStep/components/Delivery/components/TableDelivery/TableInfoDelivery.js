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
import { gql, useQuery } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import { MilkContext } from "~/components/ContextMilk/ContextMilk";
const cx = classNames.bind(styles);

function TableInfoDelivery({ hiddenButtonAddresses }) {
  const storedData = JSON.parse(localStorage.getItem("addressesData"));
  const { guest, setGuest } = useContext(MilkContext);
  const { data, error } = useQuery(
    gql`
      query Users {
        users {
          email
          id
          imageURL
          name
          phoneNumber
          token
          role {
            description
            id
            name
          }
          address {
            city
            detail
            district
            userId
            ward
          }
        }
      }
    `,
    {
      context: {
        headers: {
          authorization: `Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiI0MzgxMzVlOC1lNDgwLTQ5NGQtOTRhNy1kNWJkY2ZkMDdlNmUiLCJuYW1lIjoiTWFjIiwianRpIjoiNDM4MTM1RTgtRTQ4MC00OTRELTk0QTctRDVCRENGRDA3RTZFIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJleHAiOjE3MDA0NTI5NzcsImlzcyI6IklmV2hhdCIsImF1ZCI6IklmV2hhdENsaWVudCJ9.GnwW0BAQZUY9C_HeA2O-3j9jjhKfSMGG4rVG7qgpD0miyvVB40_Ui72RCZuppObcXPgNg4Yd2cxTvTY2_wUUYA`,
        },
      },
    }
  );
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
    // const storedGuest = JSON.parse(localStorage.getItem("guest"));
    // console.log("guest", storedGuest);
  }, [guest]);
  const { isAuthenticated, user } = useAuth0();
  const storedGuest = JSON.parse(localStorage.getItem("guest"));

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
            {data?.users.map((item, index) => {
              if (item?.email === user?.email) {
                return (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center" component="th" scope="row">
                      <span className={cx("user-name")}>
                        {storedData[0].name}
                      </span>
                    </TableCell>
                    <TableCell style={{ padding: "20px" }} align="center">
                      <span className={cx("user-phone")}>
                        {storedData[0].phone}
                      </span>
                    </TableCell>
                    {hiddenButtonAddresses ? (
                      <TableCell align="center">
                        <Address>
                          {storedData[0].detail},{storedData[0].ward},
                          {storedData[0].district},{storedData[0].city}
                        </Address>
                      </TableCell>
                    ) : (
                      <TableCell align="center">
                        <span className={cx("address-content")}>
                          <span className={cx("address-content")}>
                            <Address>
                              {storedData[0].detail},{storedData[0].ward},
                              {storedData[0].district},{storedData[0].city}
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
                    label={storedGuest ? storedGuest.nameGuest : "Mời nhập tên"}
                    variant="outlined"
                    onChange={(e) => handleGuestNameChange(e.target.value)}
                  />
                </TableCell>
                <TableCell style={{ padding: "20px" }} align="left">
                  <TextField
                    id="guest-phone"
                    label={
                      storedGuest
                        ? storedGuest.phoneGuest
                        : "Mời nhập số điện thoại"
                    }
                    variant="outlined"
                    onChange={(e) => handleGuestPhoneChange(e.target.value)}
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    id="guest-email"
                    label={
                      storedGuest ? storedGuest.emailGuest : "Mời nhập email"
                    }
                    variant="outlined"
                    onChange={(e) => handleGuestEmailChange(e.target.value)}
                  />
                </TableCell>
                <TableCell align="left">
                  <TextField
                    style={{ width: "500px" }}
                    id="guest-address"
                    label={
                      storedGuest
                        ? storedGuest.addressGuest
                        : "Mời nhập địa chỉ"
                    }
                    variant="outlined"
                    onChange={(e) => handleGuestAddressChange(e.target.value)}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </>
        )}
      </Table>
    </div>
  );
}

export default TableInfoDelivery;
