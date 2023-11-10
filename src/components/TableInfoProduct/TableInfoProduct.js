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
import ButtonDetailShipment from "../ItemCart/ButtonDetailShipment";
import ButtonDoneOrder from "~/Pages/DetailOrder/components/ConfirmDoneOrder/ButtonDoneOrder/ButtonDoneOrder";

const cx = classNames.bind(styles);

function TableInfoProduct({
  data,
  total = 0,
  tableStatus = "",
  showTotalPrice,
  title,
  titleColor,
  status,
  dataOrder,
  isShowButtonDetailShipment,
  isShowButtonDone,
}) {
  return (
    <div>
      <div className={cx("box-title")}>
        <h2 className={cx("title")}>{title}</h2>
        <h2
          className={cx("title")}
          style={{ color: titleColor ? "red" : "green" }}
        >
          {tableStatus}
        </h2>
      </div>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell
              style={{
                width: status
                  ? "30%"
                  : "40%" || isShowButtonDetailShipment
                  ? "30%"
                  : "40%",
                fontSize: "19px",
                fontWeight: "600",
              }}
            >
              Item
            </TableCell>
            <TableCell
              style={{
                width: status
                  ? "15%"
                  : "30%" || isShowButtonDetailShipment
                  ? "15%"
                  : "30%",
                fontSize: "19px",
                fontWeight: "600",
              }}
              align="left"
            >
              Price
            </TableCell>
            <TableCell
              style={{
                width: status
                  ? "15%"
                  : "20%" || isShowButtonDetailShipment
                  ? "15%"
                  : "20%",
                fontSize: "19px",
                fontWeight: "600",
              }}
              align="left"
            >
              Quantity
            </TableCell>
            <TableCell
              style={{
                width: "10%",
                fontSize: "19px",
                fontWeight: "600",
              }}
              align="left"
            >
              Total
            </TableCell>
            {status && (
              <TableCell
                style={{ width: "15%", fontSize: "19px", fontWeight: "600" }}
                align="right"
              >
                Status
              </TableCell>
            )}
            {isShowButtonDetailShipment && (
              <TableCell
                style={{ width: "15%", fontSize: "19px", fontWeight: "600" }}
                align="center"
              >
                Action
              </TableCell>
            )}
            {isShowButtonDone && (
              <TableCell
                style={{ width: "15%", fontSize: "19px", fontWeight: "600" }}
                align="center"
              >
                Action
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((item, index) => {
            if (item?.id === undefined) {
              return <></>;
            }
            return (
              <TableRow
                key={item.id + index}
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
                {status &&
                  dataOrder?.map((stt) => {
                    if (stt.id === item.id && stt.status === "CREATED") {
                      return (
                        <TableCell key={stt.id} align="right">
                          <h2>Đã tạo</h2>
                        </TableCell>
                      );
                    } else if (
                      stt.id === item.id &&
                      stt.status === "CONFIRMED"
                    ) {
                      return (
                        <TableCell key={stt.id} align="right">
                          <h2>Đã xác nhận</h2>
                        </TableCell>
                      );
                    } else if (
                      stt.id === item.id &&
                      stt.status === "SHIPPING"
                    ) {
                      return (
                        <TableCell key={stt.id} align="right">
                          <h2>Đang giao hàng</h2>
                        </TableCell>
                      );
                    } else if (
                      stt.id === item.id &&
                      stt.status === "DELIVERED"
                    ) {
                      return (
                        <TableCell key={stt.id} align="right">
                          <h2>Đã giao</h2>
                        </TableCell>
                      );
                    }
                  })}
                {isShowButtonDetailShipment && (
                  <TableCell align="center">
                    <ButtonDetailShipment data={item} />
                  </TableCell>
                )}
                {isShowButtonDone && (
                  <TableCell align="center">
                    <ButtonDoneOrder data={item} />
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {!showTotalPrice && (
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
          {data?.forEach((item) => {
            total = total + item?.price * item?.quantity;
          })}
          <span style={{ color: "var(--text-color)" }}>{total} VNĐ</span>
        </div>
      )}
    </div>
  );
}

export default TableInfoProduct;
