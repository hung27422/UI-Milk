import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";

import classNames from "classnames/bind";
import styles from "../../Delivery.module.scss";
import ButtonChangeAddress from "../ButtonChangeAddress/ButtonChangeAddress";
import Address from "../Address/Address";
const cx = classNames.bind(styles);
function createData(name, phone, address) {
  return { name, phone, address };
}
const rows = [
  createData(
    <span className={cx("user-name")}>Hồ Tấn Hùng</span>,
    <span className={cx("user-phone")}>0987654321</span>,
    <div className={cx("address-content")}>
      <Address>QL 22, Tân Xuân, HoocMon, Tp.HCM</Address>
      <ButtonChangeAddress />
    </div>
  ),
];
function TableInfoDelivery() {
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
              <TableCell align="left">{row.address}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default TableInfoDelivery;
