import classNames from "classnames/bind";
import styles from "./PointToGift.module.scss";
import Button from "../Button";
const cx = classNames.bind(styles);
function PointToGift() {
  return (
    <div className={cx("wrapper")}>
      <h2 className={cx("title")}>Tích điểm - Đổi quà</h2>
      <div className={cx("content")}>
        <div className={cx("image-content")}>
          <img
            className={cx("image-gift")}
            src="https://i.ytimg.com/vi/TQiCBT6IdA4/maxresdefault.jpg"
            alt=""
          />
        </div>
        <div className={cx("des-content")}>
          <div className={cx("item-content")}>
            <span className={cx("title-des")}>
              Mua hàng ngay - Tặng quà hay
            </span>
            <span className={cx("item-des__content")}>
              <span style={{ color: "red" }}>* </span>Chương trình nhằm tri ân
              tất cả khách hàng ủng hộ mua hàng trên website
            </span>
            <span className={cx("item-des__content")}>
              - Khi khách hàng đặt hàng trên website với trị giá là 100k sẽ được
              10 điểm ( 200k = 20 điểm).
            </span>
            <span className={cx("item-des__content")}>
              - Khách hàng có thể lấy số điểm để mua những sản phẩm có ở cửa
              hàng điểm trên website hoặc áp dụng để giảm giá khi mua sản phẩm:
              1 điểm sẽ tương đương với 1k (1 điểm = 1k).
            </span>
          </div>
          <div className={cx("btn-detail")}>
            <Button pointGift>Xem chi tiết</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PointToGift;
