import classNames from "classnames/bind";
import styles from "./MenuCategory.module.scss";
import images from "~/assets/Images/Image";
import { useContext, useState } from "react";
import { MilkContext } from "../ContextMilk/ContextMilk";
const cx = classNames.bind(styles);

const BoxMenu = ({ children, src, id, activeId, handleActive }) => {
  return (
    <div
      id={id}
      className={cx("box-menu", id === activeId ? "active" : "")}
      onClick={() => handleActive(id)}
    >
      <img className={cx("menu-logo")} src={src} alt="boxmenu"></img>
      <span className={cx("menu-name")}>{children}</span>
    </div>
  );
};

function MenuCategory() {
  const { active, setActive } = useContext(MilkContext);
  const handleActive = (id) => {
    setActive(id);
  };
  return (
    <div className={cx("wrapper")}>
      {/* <h2 className={cx("title")}>
        <span>Menu</span> Category
      </h2> */}
      <div className={cx("body-menu")}>
        <BoxMenu
          id={"1"}
          src={images.milk}
          activeId={active}
          handleActive={handleActive}
        >
          Sữa
        </BoxMenu>

        <BoxMenu
          id={"2"}
          src={images.cream}
          activeId={active}
          handleActive={handleActive}
        >
          Kem
        </BoxMenu>

        <BoxMenu
          id={"3"}
          src={images.nuocgiaikhat}
          activeId={active}
          handleActive={handleActive}
        >
          Nước
        </BoxMenu>
        <BoxMenu
          id={"4"}
          src={images.yogurt}
          activeId={active}
          handleActive={handleActive}
        >
          Yogurt
        </BoxMenu>
      </div>
    </div>
  );
}

export default MenuCategory;
