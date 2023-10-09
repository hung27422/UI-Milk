import classNames from "classnames/bind";
import styles from "./Menu.module.scss";
import MenuCategory from "~/components/MenuCategory";
import Milk from "./Page/Milk/Milk";
import Cream from "./Page/Cream/Cream";
import Beverage from "./Page/Beverage/Beverage";
import Yogurt from "./Page/Yogurt/Yogurt";
import { useContext } from "react";
import { MilkContext } from "~/components/ContextMilk/ContextMilk";
const cx = classNames.bind(styles);
function Menu() {
  const { active } = useContext(MilkContext);
  return (
    <div className={cx("wrapper")}>
      <div className="category">
        <MenuCategory />
      </div>
      <div className={cx("page-mini")}>
        {active === "1" && <Milk />}
        {active === "2" && <Cream />}
        {active === "3" && <Beverage />}
        {active === "4" && <Yogurt />}
      </div>
    </div>
  );
}

export default Menu;
