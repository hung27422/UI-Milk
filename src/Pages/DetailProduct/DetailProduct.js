import classNames from "classnames/bind";
import styles from "./Detail.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faShop } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
const cx = classNames.bind(styles);

const InfoProduct = () => {
  return (
    <>
      <span className={cx("product-name")}>
        Sữa Tươi Tiệt Trùng Có Đường TH true MILK 180 ml
      </span>
      <span className={cx("product-price")}>Giá: 8.000 đ/hộp</span>
      <span className={cx("product-capacity")}>Dung tích: 180ml/hộp</span>
    </>
  );
};
const ProductSize = () => {
  return (
    <div className="product-size">
      <span className={cx("title-size")}>Size: </span>
      <label className={cx("form-size")}>
        <input type="radio" name="hộp" value="" />
        <span className={cx("name-size")}>Hộp</span>
      </label>
      <label className={cx("form-size")}>
        <input type="radio" name="lốc" value="" />
        <span className={cx("name-size")}>Lốc ( 4 hộp )</span>
      </label>
      <label className={cx("form-size")}>
        <input type="radio" name="thùng" value="" />
        <span className={cx("name-size")}>Thùng (24 hộp)</span>
      </label>
    </div>
  );
};
const ActionButton = ({ handleQuantityMinus, quantity, handleQuantityAdd }) => {
  return (
    <div className={cx("action-btn")}>
      <div className={cx("select-quantity")}>
        <button className={cx("btn-minus")} onClick={handleQuantityMinus}>
          -
        </button>
        <span className={cx("current-quantity")}>{quantity}</span>
        <button className={cx("btn-add")} onClick={handleQuantityAdd}>
          +
        </button>
      </div>
      <div className={cx("btn-buy")}>
        <FontAwesomeIcon className={cx("icon-buy")} icon={faShop} />
        <span>Mua hàng</span>
      </div>
      <div className={cx("btn-add__cart")}>
        <FontAwesomeIcon className={cx("icon-cart")} icon={faCartPlus} />
        <span>Thêm giỏ hàng</span>
      </div>
    </div>
  );
};
const DescriptionProduct = () => {
  return (
    <div className={cx("product-description")}>
      <span className={cx("description")}>
        - Hoàn toàn từ sữa tươi sạch nguyên chất của Trang trại TH
      </span>
      <span className={cx("description")}>
        - Được sản xuất theo một quy trình sạch, khép kín từ đồng cỏ đến bàn ăn
      </span>
      <span className={cx("description")}>- Không sử dụng chất bảo quản</span>
    </div>
  );
};
const ManualProduct = () => {
  return (
    <div className={cx("product-manual")}>
      <h3 className={cx("title")}>Hướng dẫn sử dụng và bảo quản</h3>
      <span className={cx("manual")}>Bảo quản nơi khô ráo và thoáng mát. </span>
      <span className={cx("manual")}>Sử dụng ngay sau khi mở. </span>
      <span className={cx("manual")}>
        Ngon hơn khi uống lạnh. Sản phẩm có chứa sữa.{" "}
      </span>
      <span className={cx("manual")}>HSD: 180 ngày kể từ ngày sản xuất</span>
    </div>
  );
};
const ProductIngredient = () => {
  return (
    <div className={cx("product-ingredient")}>
      <h3 className={cx("title")}>Thành phần dinh dưỡng</h3>
      <span className={cx("ingredient")}>Năng lượng: 73.2 kcal</span>
      <span className={cx("ingredient")}>Chất béo: 3,2 g</span>
      <span className={cx("ingredient")}>Chất đạm: 2,9 g</span>
      <span className={cx("ingredient")}>Hydrat cacbon: 8,2 g</span>
      <span className={cx("ingredient")}>Canxi: 100 mg</span>
      <span className={cx("ingredient")}>
        Các vitamin và khoáng chất có sẵn trong sữa tươi
      </span>
    </div>
  );
};
function DetailProduct() {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityMinus = () => {
    if (quantity <= 1) {
      return;
    }
    setQuantity(quantity - 1);
  };
  const handleQuantityAdd = () => {
    setQuantity(quantity + 1);
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("image")}>
        <img
          className={cx("img-product")}
          src="https://hienthaoshop.com/wp-content/uploads/2020/06/uht-fresh-milk-sweetened-th-true-milk-box-of-1-liter.jpg"
          alt="img-product"
        />
      </div>
      <div className={cx("detail-product")}>
        <InfoProduct />
        <ProductSize></ProductSize>
        <ActionButton
          handleQuantityMinus={handleQuantityMinus}
          handleQuantityAdd={handleQuantityAdd}
          quantity={quantity}
        />
        <DescriptionProduct />
        <ManualProduct />
        <ProductIngredient />
      </div>
    </div>
  );
}

export default DetailProduct;
