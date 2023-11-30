import * as React from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import TableInfoDelivery from "./TableInfoDelivery";
import TableCartOfShipment from "~/components/TableCart/TableCartWrapper/TableCartOfShipment";
export default function TableDelivery({ error }) {
  return (
    <TableContainer component={Paper}>
      <TableInfoDelivery error={error} />

      <TableCartOfShipment />
    </TableContainer>
  );
}
