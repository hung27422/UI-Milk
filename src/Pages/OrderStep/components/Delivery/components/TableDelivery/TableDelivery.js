import * as React from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import TableInfoDelivery from "./TableInfoDelivery";
import TableInfoProduct from "./TableInfoProduct";

import classNames from "classnames/bind";
import styles from "../../Delivery.module.scss";
import Button from "~/components/Button";
const cx = classNames.bind(styles);

export default function TableDelivery() {
  return (
    <TableContainer component={Paper}>
      <TableInfoDelivery />
      <TableInfoProduct />
    </TableContainer>
  );
}
