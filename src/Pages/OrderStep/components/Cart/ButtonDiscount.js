import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CodeDiscount from "./CodeDiscount";

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

export default function ButtonDiscount() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        onClick={handleOpen}
        style={{
          fontSize: "16px",
          backgroundColor: "var(--secondary)",
          color: "var(--white)",
          fontWeight: "700",
          height: "40px",
          lineHeight: "40px",
        }}
      >
        Áp dụng
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Chọn mã giảm giá:
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <CodeDiscount handleClose={handleClose} />
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
