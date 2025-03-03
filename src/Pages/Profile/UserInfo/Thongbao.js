import * as React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

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

export default function ThongBaoUserUpdateThanhCong() {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <Button onClick={setOpen(true)}>Cập nhật</Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <p>Cập nhật user thành công</p>
      </Modal>
    </div>
  );
}
