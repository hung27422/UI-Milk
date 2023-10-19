import classNames from "classnames/bind";
import styles from "./Cart.module.scss";
import Button from "~/components/Button";
const cx = classNames.bind(styles);
function CodeDiscount() {
  return (
    <div className={cx("code-discount")}>
      <div className={cx("form-discount")}>
        <span className={cx("title-voucher")}>Mã Voucher: </span>
        <input
          className={cx("input-voucher")}
          type="search"
          placeholder="Nhập mã voucher"
        />
        <Button selectChoose>Áp Dụng</Button>
      </div>
      <div className={cx("list-discount")}>
        <div className={cx("discount-item")}>
          <img
            className={cx("img-discount")}
            src="https://product.hstatic.net/200000551679/product/tag-11_a9411fd05c3b47d9a98b566ecd9b46c1_grande.png"
            alt=""
          />
        </div>
        <div className={cx("discount-item")}>
          <span className={cx("desc-discount")}>
            Giảm 10k đối với. <p className={cx("desc-item")}>Đơn giá 200k</p>
          </span>
          <span className={cx("expiry")}>Hạn sử dụng: 31.12.2023</span>
        </div>
        <Button selectChoose>Chọn</Button>
      </div>
      <div className={cx("list-discount")}>
        <div className={cx("discount-item")}>
          <img
            className={cx("img-discount")}
            src="https://product.hstatic.net/200000551679/product/tag-11_a9411fd05c3b47d9a98b566ecd9b46c1_grande.png"
            alt=""
          />
        </div>
        <div className={cx("discount-item")}>
          <span className={cx("desc-discount")}>
            Giảm 10k đối với. <p className={cx("desc-item")}>Đơn giá 200k</p>
          </span>
          <span className={cx("expiry")}>Hạn sử dụng: 31.12.2023</span>
        </div>
        <Button selectChoose>Chọn</Button>
      </div>
    </div>
  );
}

export default CodeDiscount;
