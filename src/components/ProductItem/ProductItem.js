import classNames from "classnames/bind";
import styles from "./ProductItem.module.scss";
import Popper from "../Popper/Popper";
import configs from "~/configs";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { MilkContext } from "../ContextMilk/ContextMilk";

const cx = classNames.bind(styles);
function ProductItem({ hidden, data, inventoryId }) {
  const { setIdProduct, setIdInventory } = useContext(MilkContext);

  const handleDetailProduct = () => {
    console.log(typeof data.id);
    setIdProduct(data.id);
    setIdInventory(inventoryId);
  };
  return (
    <NavLink
      to={configs.routes.detailproduct}
      onClick={handleDetailProduct}
      className={cx("wrapper")}
    >
      <Popper>
        <div className={cx("header")}>
          <img className={cx("product-image")} src={data?.images} alt="milk" />
        </div>
        <div className={cx("container")}>
          <span className={cx("product-name")}>{data?.name}</span>
          <div className={cx("product-info", { hidden })}>
            <div className={cx("product-price")}>
              {/* <span className={cx("price-discount")}>12.000đ</span> */}
              <span className={cx("price-new")}>{data?.price}</span>
            </div>
          </div>
        </div>
      </Popper>
    </NavLink>
  );
}

export default ProductItem;
