import classNames from "classnames/bind";
import styles from "./Detail.module.scss";
import { useContext } from "react";
import { MilkContext } from "~/components/ContextMilk/ContextMilk";
import DescriptionProduct from "./DescriptionProduct";
import ManualProduct from "./ManualProduct";
import ProductIngredient from "./ProductIngredient";
import ActionButton from "./ActionButton";
import InfoProduct from "./InfoProduct";
const cx = classNames.bind(styles);

function DetailProduct() {
  const { products } = useContext(MilkContext);
  const { idProduct, idInventory } = useContext(MilkContext);
  // console.log("idInventory", idInventory);
  return (
    <div>
      {products?.map(
        (product) =>
          product.id === idProduct && (
            <div key={product.id} className={cx("wrapper")}>
              <div className={cx("image")}>
                <img
                  className={cx("img-product")}
                  src="https://hienthaoshop.com/wp-content/uploads/2020/06/uht-fresh-milk-sweetened-th-true-milk-box-of-1-liter.jpg"
                  alt="img-product"
                />
              </div>
              <div className={cx("detail-product")}>
                <InfoProduct product={product} idInventory={idInventory} />
                <ActionButton product={product} idInventory={idInventory} />
                <DescriptionProduct />
                <ManualProduct />
                <ProductIngredient />
              </div>
            </div>
          )
      )}
    </div>
  );
}

export default DetailProduct;
