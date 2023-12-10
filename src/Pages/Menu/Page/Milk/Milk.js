import classNames from "classnames/bind";
import styles from "./Milk.module.scss";
import ProductItem from "~/components/ProductItem/ProductItem";
import { useContext, useEffect } from "react";
import { MilkContext } from "~/components/ContextMilk/ContextMilk";
import useQueryInventories from "~/hooks/useQueryInventories";
import useQueryProduct from "~/hooks/useQueryProduct";

const cx = classNames.bind(styles);

function Milk() {
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
  const hasMilkProducts = data?.products.filter(
    (item) => item?.category.name === "Milk"
  );

  return (
    <div>
      {hasMilkProducts && (
        <MilkList hasMilkProducts={hasMilkProducts} inventory={inventory} />
      )}
    </div>
  );
}
//Hiển thị
const MilkList = ({ hasMilkProducts, inventory }) => (
  <div className={cx("wrapper")}>
    {hasMilkProducts?.map((product) => {
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
export default Milk;
