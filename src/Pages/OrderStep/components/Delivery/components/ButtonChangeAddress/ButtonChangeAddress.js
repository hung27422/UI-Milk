import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Address from "../Address/Address";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 3,
};

export default function ButtonChangeAddress({ data }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const storedData = JSON.parse(localStorage.getItem("addressesData"));

  return (
    <div>
      <Button
        style={{ backgroundColor: "var(--secondary)", color: "var(--white)" }}
        onClick={handleOpen}
      >
        Thay đổi
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Địa chỉ của tôi
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {storedData?.map((item) => {
              return (
                <Address key={item?.id} data={item} border selectAddress>
                  {item.detail},{item.ward},{item.district},{item.city}
                </Address>
              );
            })}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
