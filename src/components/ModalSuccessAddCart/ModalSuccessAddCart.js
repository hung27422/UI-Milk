import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
function ModalSuccessAddCart({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: "20px",
        }}
      >
        <h2
          style={{
            color: "var(--secondary)",
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          Thêm giỏ hàng thành công
        </h2>
        <p>Sản phẩm đã được thêm vào giỏ hàng của bạn.</p>
        {/* <Button variant="contained" color="primary" onClick={onClose}>
          Đóng  
        </Button> */}
      </div>
    </Modal>
  );
}
export default ModalSuccessAddCart;
