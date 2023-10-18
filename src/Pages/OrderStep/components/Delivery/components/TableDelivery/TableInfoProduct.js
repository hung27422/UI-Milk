import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import classNames from "classnames/bind";
import styles from "../../Delivery.module.scss";

import ItemProduct from "~/components/ItemCart/ItemProduct";
import PriceProduct from "~/components/ItemCart/PriceProduct";
import TotalPrice from "~/components/ItemCart/TotalPrice";

const cx = classNames.bind(styles);
function createData(name, price, quantity, total, deleteproduct) {
  return { name, price, quantity, total, deleteproduct };
}
const rows = [
  createData(
    <ItemProduct />,
    <PriceProduct />,
    <span
      style={{
        color: "var(--text-color)",
        fontSize: "20px",
        fontWeight: "700",
        marginLeft: "42px",
      }}
    >
      1
    </span>,
    <TotalPrice />
  ),
  createData(
    <ItemProduct />,
    <PriceProduct />,
    <span
      style={{
        color: "var(--text-color)",
        fontSize: "20px",
        fontWeight: "700",
        marginLeft: "42px",
      }}
    >
      1
    </span>,
    <TotalPrice />
  ),
];

function TableInfoProduct() {
  return (
    <div>
      <h2 className={cx("title")}>Thông tin sản phẩm</h2>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell
              style={{ width: "40%", fontSize: "19px", fontWeight: "600" }}
            >
              Item
            </TableCell>
            <TableCell
              style={{ width: "30%", fontSize: "19px", fontWeight: "600" }}
              align="left"
            >
              Price
            </TableCell>
            <TableCell
              style={{ width: "20%", fontSize: "19px", fontWeight: "600" }}
              align="left"
            >
              Quantity
            </TableCell>
            <TableCell
              style={{ width: "10%", fontSize: "19px", fontWeight: "600" }}
              align="left"
            >
              Total
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
                {row.price}
              </TableCell>
              <TableCell align="left">{row.quantity}</TableCell>
              <TableCell align="left">{row.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div
        style={{
          padding: "20px",
          textAlign: "right",
          width: "100%",
          fontSize: "30px",
          fontWeight: "600",
        }}
      >
        <span>Tổng tiền: </span>
        <span style={{ color: "var(--text-color)" }}>24000 VNĐ</span>
      </div>
    </div>
  );
}

export default TableInfoProduct;
