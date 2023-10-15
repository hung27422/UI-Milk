import classNames from "classnames/bind";
import styles from "./CardItem.module.scss";
import images from "~/assets/Images/Image";
const cx = classNames.bind(styles);
function CardItem({ isActiveCard, handleCardClick, src, id }) {
  return (
    <div className={cx("wrapper")}>
      <div
        id={id}
        className={cx("card-item", id === isActiveCard ? "active-card" : "")}
        onClick={() => handleCardClick(id)}
      >
        <img className={cx("img-card")} src={src} alt="" />
        {isActiveCard === id && (
          <div className={cx("check")}>
            <img className={cx("icon-check")} src={images.check} alt="" />
          </div>
        )}
      </div>
    </div>
  );
}

export default CardItem;
