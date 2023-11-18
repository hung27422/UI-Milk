import * as React from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import TableInfoDelivery from "./TableInfoDelivery";
import TableCartOfShipment from "~/components/TableCart/TableCartWrapper/TableCartOfShipment";
export default function TableDelivery() {
  return (
    <TableContainer component={Paper}>
      <TableInfoDelivery />
      <TableCartOfShipment />
    </TableContainer>
  );
}
