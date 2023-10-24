import classNames from "classnames/bind";
import styles from "./ProductItem.module.scss";
import Popper from "../Popper/Popper";
import configs from "~/configs";
import { NavLink } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import { MilkContext } from "../ContextMilk/ContextMilk";

const cx = classNames.bind(styles);
function ProductItem({ hidden, data }) {
  const { setIdProduct } = useContext(MilkContext);
  const handleDetailProduct = () => {
    setIdProduct(data.id);
  };
  return (
    <NavLink
      to={configs.routes.detailproduct}
      onClick={handleDetailProduct}
      className={cx("wrapper")}
    >
      <Popper>
        <div className={cx("header")}>
          <img
            className={cx("product-image")}
            src="https://www.thmilk.vn/wp-content/uploads/2021/02/HILO-457x396.png"
            alt="milk"
          />
        </div>
        <div className={cx("container")}>
          <span className={cx("product-name")}>{data?.name}</span>
          <div className={cx("product-info", { hidden })}>
            <div className={cx("product-price")}>
              <span className={cx("price-discount")}>12.000đ</span>
              <span className={cx("price-new")}>{data?.price}</span>
            </div>
          </div>
        </div>
      </Popper>
    </NavLink>
  );
}

export default ProductItem;
