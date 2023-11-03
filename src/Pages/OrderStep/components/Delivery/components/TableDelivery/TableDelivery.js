import * as React from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import TableInfoDelivery from "./TableInfoDelivery";
import { TableInfoProductWrapper } from "~/components/TableInfoProduct/TableInfoProductWrapper";
export default function TableDelivery() {
  return (
    <TableContainer component={Paper}>
      <TableInfoDelivery />
      <TableInfoProductWrapper />
    </TableContainer>
  );
}
