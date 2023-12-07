import classNames from "classnames/bind";
import styles from "./Yogurt.module.scss";
import ProductItem from "~/components/ProductItem/ProductItem";
import { useContext, useEffect } from "react";
import { MilkContext } from "~/components/ContextMilk/ContextMilk";
import useQueryInventories from "~/hooks/useQueryInventories";
import useQueryProduct from "~/hooks/useQueryProduct";

const cx = classNames.bind(styles);

function Yogurt() {
  const { products, setProducts } = useContext(MilkContext);
  const { inventory, setInventory } = useContext(MilkContext);
  const { data: dataInventory } = useQueryInventories();
  const { data, error } = useQueryProduct();

  useEffect(() => {
    if (error) {
      console.log(error);
    } else if (data) {
      setProducts(data?.products);
      setInventory(dataInventory?.inventories);
      console.log(inventory);
    } else if (dataInventory) {
      setInventory(dataInventory?.inventories);
    }
  }, [
    data,
    setProducts,
    products,
    error,
    dataInventory,
    setInventory,
    inventory,
  ]);
  const hasYogurtProducts = data?.products.filter(
    (item) => item?.category.name === "Yogurt"
  );

  return (
    <div>
      {hasYogurtProducts && (
        <MilkList hasYogurtProducts={hasYogurtProducts} inventory={inventory} />
      )}
    </div>
  );
}
//Hiển thị
const MilkList = ({ hasYogurtProducts, inventory }) => (
  <div className={cx("wrapper")}>
    {hasYogurtProducts?.map((product) => {
      const inventoryData = inventory?.find(
        (item) => item.productId === product.id
      );

      return (
        <ProductItem
          data={product}
          key={product.id}
          inventoryId={inventoryData ? inventoryData.id : null}
        />
      );
    })}
  </div>
);
export default Yogurt;
