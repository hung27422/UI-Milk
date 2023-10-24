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
import { useContext } from "react";
import { MilkContext } from "../ContextMilk/ContextMilk";
import { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";

export default function TableCart() {
  const { cartItem } = useContext(MilkContext);
  const { data } = useQuery(gql`
    query Items {
      items {
        name
        orderId
        price
        productId
        quantity
        sku
      }
    }
  `);
  useEffect(() => {
    if (cartItem) {
      console.log(cartItem);
    }
  }, [cartItem]);

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
          {cartItem?.map((item) => {
            return (
              <TableRow
                key={item?.id}
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
                <TableCell align="left">
                  <DeleteProduct data={item} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
