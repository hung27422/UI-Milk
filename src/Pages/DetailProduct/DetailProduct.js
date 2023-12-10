import classNames from "classnames/bind";
import styles from "./Detail.module.scss";
import { useContext } from "react";
import { MilkContext } from "~/components/ContextMilk/ContextMilk";
import DescriptionProduct from "./DescriptionProduct";
import ManualProduct from "./ManualProduct";
import ActionButton from "./ActionButton";
import InfoProduct from "./InfoProduct";
import ReviewProduct from "./ReviewProduct";
const cx = classNames.bind(styles);

function DetailProduct() {
  const { products } = useContext(MilkContext);
  const { idProduct, idInventory } = useContext(MilkContext);
  return (
    <div>
      {products?.map(
        (product) =>
          product.id === idProduct && (
            <div key={product.id} className={cx("wrapper")}>
              <div className={cx("box-info")}>
                <div className={cx("image")}>
                  <img
                    className={cx("img-product")}
                    src={product?.images}
                    alt="img-product"
                  />
                </div>
                <div className={cx("detail-product")}>
                  <InfoProduct product={product} idInventory={idInventory} />
                  <ActionButton product={product} idInventory={idInventory} />
                  <DescriptionProduct />
                  <ManualProduct />
                </div>
              </div>
              <div>
                <ReviewProduct product={product} />
              </div>
            </div>
          )
      )}
    </div>
  );
}

export default DetailProduct;
