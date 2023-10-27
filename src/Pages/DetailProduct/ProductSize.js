import classNames from "classnames/bind";
import styles from "./Detail.module.scss";
import { useContext, useEffect, useState } from "react";
import { MilkContext } from "~/components/ContextMilk/ContextMilk";
const cx = classNames.bind(styles);
function ProductSize({ product }) {
  const { isChecked, setIsChecked, setPriceSize, setNameSize } =
    useContext(MilkContext);

  const handleIsChecked = (id, name, price) => {
    setIsChecked(id);
    setNameSize(name);
    setPriceSize(price);
  };

  const sizes = [
    {
      id: 1,
      name: "Hộp",
      price: product.price,
    },
    {
      id: 2,
      name: "Lốc ( 4 hộp )",
      price: product.price * 4,
    },
    {
      id: 3,
      name: "Thùng (24 hộp)",
      price: product.price * 24,
    },
  ];
  return (
    <div className={cx("product-size")}>
      <span className={cx("title-size")}>Size: </span>
      {sizes.map((size) => (
        <div className={cx("form-group")} key={size.id}>
          <label className={cx("form-size")}>
            <input
              checked={isChecked === size.id}
              type="radio"
              name="hộp"
              value=""
              onChange={() => handleIsChecked(size.id, size.name, size.price)}
            />
            <span className={cx("name-size")}>{size.name}</span>
          </label>
        </div>
      ))}
    </div>
  );
}

export default ProductSize;
