import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
function ModalSuccessAddCart({
  open,
  onClose,
  showStock,
  quantityInventory,
  nameInventory,
}) {
  return (
    <Modal open={open} onClose={onClose}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          width: "600px",
          padding: "20px",
        }}
      >
        {showStock ? (
          <span
            style={{
              fontSize: "18px",
              fontFamily: "var(--font-primary)",
              fontWeight: "600",
              color: "var(--text-color)",
            }}
          >
            Xin lỗi, số lượng sản phẩm bạn muốn mua{" "}
            {nameInventory && (
              <span
                style={{ color: "red", fontWeight: "700", fontSize: "20px" }}
              >
                {nameInventory}
              </span>
            )}{" "}
            vượt quá số lượng hiện có trong kho. Hiện tại, chúng tôi chỉ còn{" "}
            <span style={{ color: "red", fontWeight: "700", fontSize: "20px" }}>
              {quantityInventory}
            </span>{" "}
            sản phẩm.<br></br> Vui lòng giảm số lượng hoặc liên hệ với chúng tôi
            để biết thêm chi tiết. Cảm ơn bạn!
          </span>
        ) : (
          <>
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
          </>
        )}
        <div style={{ width: "100%", textAlign: "center", marginTop: "20px" }}>
          <Button
            style={{ textAlign: "center" }}
            variant="contained"
            color="primary"
            onClick={onClose}
          >
            Đóng
          </Button>
        </div>
      </div>
    </Modal>
  );
}
export default ModalSuccessAddCart;
