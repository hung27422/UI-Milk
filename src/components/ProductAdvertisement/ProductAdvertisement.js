import classNames from "classnames/bind";
import styles from "./ProductAdvertisement.module.scss";
import Button from "../Button";
import configs from "~/configs";
const cx = classNames.bind(styles);
function ProductAdvertisement() {
  return (
    <div className={cx("wrapper")}>
      <h2 className={cx("title")}>Góc sức khỏe</h2>
      <div className={cx("content")}>
        <div className={cx("image-box")}>
          <img
            className={cx("image-content")}
            src="https://cdn.tgdd.vn/Files/2021/12/30/1408125/thu-ngay-thuc-uong-thien-nhien-tu-sua-hat-th-true-nut-202112301720033597.jpg"
            alt=""
          />
        </div>
        <div className={cx("des-content")}>
          <div className={cx("title-content")}>
            <span className={cx("title-item-1")}>
              Sữa, Yogurt, Kem, Nước giải khát làm từ sữa, gạo, trái cây mọi thứ
              bạn muốn đều có trong cửa hàng này.
            </span>
            <span className={cx("title-item-2")}>
              Những sản phẩm ở cửa hàng chúng tôi đều có lợi cho sức khỏe của
              các bạn. Không cần phải chờ đợi, suy nghĩ bạn hãy nhanh tay lựa
              chọn sản phẩm và đặt hàng ngay nào.
            </span>
          </div>
          <Button to={configs.routes.menu} select>
            Xem sản phẩm ngay
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductAdvertisement;
