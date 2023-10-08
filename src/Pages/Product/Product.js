import classNames from "classnames/bind";
import styles from "./Product.module.scss";
import MenuCategory from "~/components/MenuCategory";
import { useContext } from "react";
import { MilkContext } from "~/components/ContextMilk/ContextMilk";
import Milk from "./Page/Milk/Milk";
import Cream from "./Page/Cream/Cream";
import Beverage from "./Page/Beverage/Beverage";
import Yogurt from "./Page/Yogurt/Yogurt";
const cx = classNames.bind(styles);
function Product() {
  const { active, setActive } = useContext(MilkContext);

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

export default Product;
