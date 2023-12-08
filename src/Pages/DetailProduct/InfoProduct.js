import classNames from "classnames/bind";
import styles from "./Detail.module.scss";
import { useContext } from "react";
import { MilkContext } from "~/components/ContextMilk/ContextMilk";
import useQueryInventories from "~/hooks/useQueryInventories";
const cx = classNames.bind(styles);

function InfoProduct({ product, idInventory }) {
  const { inventory } = useContext(MilkContext);

  return (
    <div>
      {inventory?.map((item) => {
        if (item?.id === idInventory) {
          return (
            <div className={cx("info-product")} key={item?.id}>
              <span className={cx("product-name")}>{product.name}</span>
              <span className={cx("product-price")}>
                Giá: {product.price} đ/hộp
              </span>
              <span className={cx("quantity-inventories")}>
                Số lượng tồn kho: {item?.quantity}
              </span>
          </div>
          );
        }
      })}
    </div>
  );
}

export default InfoProduct;
