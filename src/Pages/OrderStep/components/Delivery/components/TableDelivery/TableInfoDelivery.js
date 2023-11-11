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
import { useEffect } from "react";
const cx = classNames.bind(styles);

function TableInfoDelivery({ hiddenButtonAddresses }) {
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
          authorization: `Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiI0MzgxMzVlOC1lNDgwLTQ5NGQtOTRhNy1kNWJkY2ZkMDdlNmUiLCJuYW1lIjoiTWFjIiwianRpIjoiNDM4MTM1RTgtRTQ4MC00OTRELTk0QTctRDVCRENGRDA3RTZFIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJleHAiOjE2OTk4NTAzOTUsImlzcyI6IklmV2hhdCIsImF1ZCI6IklmV2hhdENsaWVudCJ9.xxTUpAsxG5-y-Jv-6FAjYUPSK-iuYsxW2SOIkxxmY6RIW1GgS1SYjstm0bQJ__TGNUYlhAAo7RSbBNe9XE1NiQ`,
        },
      },
    }
  );
  // useEffect(() => {
  //   if (error) {
  //     console.log("Lỗi", error);
  //   } else if (data) {
  //     console.log("User", data);
  //   }
  // }, [data, error]);
  const { isAuthenticated, user } = useAuth0();
  return (
    <div>
      <h2 className={cx("title")}>Thông tin giao hàng</h2>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell
              style={{ width: "20%", fontSize: "19px", fontWeight: "600" }}
            >
              Tên
            </TableCell>
            <TableCell
              style={{ width: "20%", fontSize: "19px", fontWeight: "600" }}
              align="left"
            >
              Số điện thoại
            </TableCell>
            <TableCell
              style={{ width: "60%", fontSize: "19px", fontWeight: "600" }}
              align="left"
            >
              Địa chỉ
            </TableCell>
          </TableRow>
        </TableHead>
        {isAuthenticated && (
          <TableBody>
            {data?.users.map((item, index) => {
              if (item?.email === user?.email) {
                return (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <span className={cx("user-name")}>{item?.name}</span>
                    </TableCell>
                    <TableCell style={{ padding: "20px" }} align="left">
                      <span className={cx("user-phone")}>
                        {item?.phoneNumber}
                      </span>
                    </TableCell>
                    {hiddenButtonAddresses ? (
                      <TableCell align="left">
                        <Address>QL 22, Tân Xuân, HoocMon, Tp.HCM</Address>
                      </TableCell>
                    ) : (
                      <TableCell align="left">
                        <span className={cx("address-content")}>
                          <span className={cx("address-content")}>
                            <Address>QL 22, Tân Xuân, HoocMon, Tp.HCM</Address>
                            <ButtonChangeAddress />
                          </span>
                        </span>
                      </TableCell>
                    )}
                  </TableRow>
                );
              }
            })}
          </TableBody>
        )}
      </Table>
    </div>
  );
}

export default TableInfoDelivery;
