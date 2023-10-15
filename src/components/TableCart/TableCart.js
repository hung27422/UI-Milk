import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ItemProduct from "../ItemCart/ItemProduct";
import PriceProduct from "../ItemCart/PriceProduct";
import QuantityProduct from "../ItemCart/QuantityProduct";
import TotalPrice from "../ItemCart/TotalPrice";
import DeleteProduct from "../ItemCart/DeleteProduct";

function createData(name, price, quantity, total, deleteproduct) {
  return { name, price, quantity, total, deleteproduct };
}

const rows = [
  createData(
    <ItemProduct />,
    <PriceProduct />,
    <QuantityProduct />,
    <TotalPrice />,
    <DeleteProduct />
  ),
];

export default function TableCart() {
  return (
    <TableContainer sx={{ backgroundColor: "var(--white)" }} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ width: "30%" }}>Items</TableCell>
            <TableCell style={{ width: "25%" }} align="left">
              Price
            </TableCell>
            <TableCell style={{ width: "20%" }} align="left">
              Quantity
            </TableCell>
            <TableCell style={{ width: "20%" }} align="left">
              Total
            </TableCell>
            <TableCell style={{ width: "5%" }} align="left">
              Delete
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
              <TableCell align="left">{row.price}</TableCell>
              <TableCell align="left">{row.quantity}</TableCell>
              <TableCell align="left">{row.total}</TableCell>
              <TableCell align="left">{row.deleteproduct}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
