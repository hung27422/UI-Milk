import classNames from "classnames/bind";
import styles from "./TableInfoProduct.module.scss";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import ItemProduct from "../ItemCart/ItemProduct";
import PriceProduct from "../ItemCart/PriceProduct";
import QuantityProduct from "../ItemCart/QuantityProduct";
import TotalPrice from "../ItemCart/TotalPrice";

const cx = classNames.bind(styles);

function TableInfoProduct({ waitConfirm, doneOrder }) {
  const localStorageCart = JSON.parse(localStorage.getItem("cartItems"));
  let total = 0;
  return (
    <div>
      <div className={cx("box-title")}>
        <h2 className={cx("title")}>Thông tin sản phẩm</h2>
        {waitConfirm && (
          <h2 className={cx("title")} style={{ color: "red" }}>
            Chờ xác nhận
          </h2>
        )}
        {doneOrder && (
          <h2 className={cx("title")} style={{ color: "green" }}>
            Giao hàng thành công
          </h2>
        )}
      </div>
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
          {localStorageCart?.map((item) => (
            <TableRow
              key={item.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <ItemProduct data={item} />
              </TableCell>
              <TableCell style={{ padding: "20px" }} align="left">
                <PriceProduct data={item} />
              </TableCell>
              <TableCell align="left">
                <QuantityProduct data={item} />
              </TableCell>
              <TableCell align="left">
                <TotalPrice data={item} />
              </TableCell>
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
        {localStorageCart.forEach((item) => {
          total = total + item.total;
        })}
        <span style={{ color: "var(--text-color)" }}>{total} VNĐ</span>
      </div>
    </div>
  );
}

export default TableInfoProduct;
