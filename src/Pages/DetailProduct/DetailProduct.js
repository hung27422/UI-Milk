import classNames from "classnames/bind";
import styles from "./Detail.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faShop } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { MilkContext } from "~/components/ContextMilk/ContextMilk";
import DescriptionProduct from "./DescriptionProduct";
import ManualProduct from "./ManualProduct";
import ProductIngredient from "./ProductIngredient";
import ProductSize from "./ProductSize";
import ActionButton from "./ActionButton";
const cx = classNames.bind(styles);

const InfoProduct = ({ namePro, pricePro, capacityPro }) => {
  return (
    <>
      <span className={cx("product-name")}>{namePro}</span>
      <span className={cx("product-price")}>Giá: {pricePro} đ/hộp</span>
      <span className={cx("product-capacity")}>
        Dung tích: {capacityPro}/hộp
      </span>
    </>
  );
};

function DetailProduct() {
  const { products } = useContext(MilkContext);
  const { idProduct } = useContext(MilkContext);

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
                <InfoProduct
                  namePro={product.name}
                  pricePro={product.price}
                  capacityPro={180}
                />
                <ProductSize />
                <ActionButton product={product} />
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
