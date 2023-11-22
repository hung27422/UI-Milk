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

export default function TableCart({ showDelete, title, total }) {
  const localStorageCart = JSON.parse(localStorage.getItem("cartItems"));
  // console.log("nan", localStorageCart);
  return (
    <TableContainer sx={{ backgroundColor: "var(--white)" }} component={Paper}>
      <h2>{title}</h2>
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
            {!showDelete && (
              <TableCell style={{ width: "5%" }} align="left">
                Delete
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {localStorageCart?.map((item, index) => {
            return (
              <TableRow
                key={item?.id + index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <ItemProduct data={item} />
                </TableCell>
                <TableCell align="left">
                  <PriceProduct data={item} />
                </TableCell>

                <TableCell align="left">
                  <QuantityProduct data={item} />
                </TableCell>

                <TableCell align="left">
                  <TotalPrice data={item} />
                </TableCell>
                {!showDelete && (
                  <TableCell align="left">
                    <DeleteProduct data={item} />
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
