import * as React from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import TableInfoDelivery from "./TableInfoDelivery";
import TableInfoProduct from "../../../../../../components/TableInfoProduct/TableInfoProduct";

export default function TableDelivery() {
  return (
    <TableContainer component={Paper}>
      <TableInfoDelivery />
      <TableInfoProduct />
    </TableContainer>
  );
}
