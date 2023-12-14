import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import classNames from "classnames/bind";
import styles from "./ButtonShowInfoOrders.module.scss";
import ButtonReviewProduct from "../DoneOrders/ButtonReviewProduct";
const cx = classNames.bind(styles);
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ButtonShowInfoOrders({ data, isShowButtonReview }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let total = 0;
  return (
    <div>
      <Button
        style={{ backgroundColor: "var(--secondary)", color: "var(--white)" }}
        onClick={handleOpen}
      >
        Xem thông tin
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={cx("header")}>
            <h3 className={cx("title")}>Xem thông tin sản phẩm</h3>
            {data?.status === "CREATED" && (
              <h3 className={cx("status")}>Chưa xác nhận</h3>
            )}
            {data?.status === "CONFIRMED" && (
              <h3 className={cx("status")}>Đã xác nhận</h3>
            )}
            {data?.status === "SHIPPING" && (
              <h3 className={cx("status")}>Đang giao hàng</h3>
            )}
            {data?.status === "DELIVERED" && (
              <h3 className={cx("status")}>Đã giao</h3>
            )}
          </div>
          <div className={cx("content")}>
            {data?.items?.map((item, i) => (
              <div
                key={item?.id}
                className={cx(
                  "box-info-order",
                  !isShowButtonReview && "isShowButtonReview"
                )}
              >
                <div className={cx("box-product")}>
                  <img
                    className={cx("img-product")}
                    src={item?.Product?.images}
                    alt=""
                  />
                  <div className={cx("info-product")}>
                    <span className={cx("name-product")}>{item?.name}</span>
                    <span className={cx("quantity-product")}>
                      x {item?.quantity}
                    </span>
                    <span className={cx("price-product")}>
                      {item?.price} VNĐ
                    </span>
                  </div>
                </div>
                {isShowButtonReview && (
                  <div className={cx("box-reviews")}>
                    <ButtonReviewProduct data={item} />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className={cx("total-price")}>
            Tổng tiền: {(total += data.total)} VNĐ
          </div>
          <div className={cx("show-action")}>
            {data?.cancelReason && (
              <span className={cx("reason-cancel")}>
                Hủy với lí do: {data?.cancelReason}
              </span>
            )}

            <div className={cx("btn-action")}>
              <Button
                style={{
                  backgroundColor: "var(--secondary)",
                  color: "var(--white)",
                  textAlign: "right",
                }}
                onClick={handleClose}
              >
                Ok
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
