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
const cx = classNames.bind(styles);
function createData(name, phone, address, hiddenButtonAddresses) {
  return { name, phone, address, hiddenButtonAddresses };
}

function TableInfoDelivery({ hiddenButtonAddresses }) {
  const { isAuthenticated, user } = useAuth0();
  const rows = [
    createData(
      <span className={cx("user-name")}>{user?.name}</span>,
      <span className={cx("user-phone")}>098765321</span>,
      <div className={cx("address-content")}>
        <Address>QL 22, Tân Xuân, HoocMon, Tp.HCM</Address>
        <ButtonChangeAddress />
      </div>,
      <div className={cx("address-content")}>
        <Address>QL 22, Tân Xuân, HoocMon, Tp.HCM</Address>
      </div>
    ),
  ];
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
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell style={{ padding: "20px" }} align="left">
                  {row.phone}
                </TableCell>
                {hiddenButtonAddresses ? (
                  <TableCell align="left">
                    {row.hiddenButtonAddresses}
                  </TableCell>
                ) : (
                  <TableCell align="left">{row.address}</TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  );
}

export default TableInfoDelivery;
