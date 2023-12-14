import classNames from "classnames/bind";
import styles from "./Cart.module.scss";
import TableCart from "~/components/TableCart/TableCart";
import Button from "~/components/Button";
import configs from "~/configs";
import { useContext, useEffect, useState } from "react";
import { MilkContext } from "~/components/ContextMilk/ContextMilk";
import ModalSuccessAddCart from "~/components/ModalSuccessAddCart/ModalSuccessAddCart";
import useQueryInventories from "~/hooks/useQueryInventories";
const cx = classNames.bind(styles);

const InfoPrice = ({ numberPrice, title }) => {
  return (
    <>
      <h3 className={cx("title")}>{title}</h3>
      <span className={cx("content")}>{numberPrice} VNĐ</span>
    </>
  );
};
function Cart() {
  const localStorageCart = JSON.parse(localStorage.getItem("cartItems"));
  const { setActiveStep } = useContext(MilkContext);
  const { data } = useQueryInventories();
  const [quantityInventory, setQuantityInventory] = useState();
  const [nameInventory, setNameInventory] = useState();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [stock, setStock] = useState(false);
  useEffect(() => setActiveStep(0), [setActiveStep]);
  let total = 0;
  const handleBuyOrder = async () => {
    if (localStorageCart && data) {
      let hasInsufficientStock = false;

      for (const item of localStorageCart) {
        const inventoryItem = data.inventories.find(
          (inv) => inv.productId === item.id
        );

        if (inventoryItem && item.quantity > inventoryItem.quantity) {
          hasInsufficientStock = true;
          setQuantityInventory(inventoryItem.quantity);
          setNameInventory(item?.name);
          break;
        } else {
          total += item.total;
        }
      }

      if (hasInsufficientStock) {
        setStock(true);
        setShowSuccessModal(true);
      } else {
        window.location.href = `${configs.routes.delivery}`;
      }
    }
  };
  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };

  if (localStorageCart?.length === 0) {
    return (
      <div className={cx("wrapper", "no-cart")}>
        <h3>Bạn chưa có sản phẩm nào trong giỏ hàng</h3>
        <img
          className={cx("img-cart")}
          src="https://bizweb.dktcdn.net/100/320/202/themes/714916/assets/empty-cart.png?1650292912948"
          alt=""
        />
      </div>
    );
  }
  return (
    <div className={cx("wrapper")}>
      {stock && (
        <ModalSuccessAddCart
          open={showSuccessModal} // Pass the open prop
          onClose={handleCloseModal}
          showStock={stock}
          quantityInventory={quantityInventory}
          nameInventory={nameInventory}
        />
      )}
      <div className={cx("header")}>
        <TableCart />
      </div>
      <div className={cx("container")}>
        <div className={cx("total-price")}>
          {localStorageCart?.forEach((item) => {
            total = total + item.total;
          })}
          <InfoPrice title={"TotalPrice"} numberPrice={total}></InfoPrice>
        </div>
        <div className={cx("btn-action")}>
          <Button checkout onClick={handleBuyOrder}>
            Mua hàng
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
