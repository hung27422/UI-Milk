import { useContext, useEffect } from "react";
import { MilkContext } from "~/components/ContextMilk/ContextMilk";
import ProductItem from "~/components/ProductItem/ProductItem";
import useQueryInventories from "~/hooks/useQueryInventories";
import useQueryProduct from "~/hooks/useQueryProduct";
import classNames from "classnames/bind";
import styles from "./Cream.module.scss";
const cx = classNames.bind(styles);

function Cream() {
  const { products, setProducts } = useContext(MilkContext);
  const { inventory, setInventory } = useContext(MilkContext);
  const { data: dataInventory } = useQueryInventories();
  const { data, error } = useQueryProduct();

  useEffect(() => {
    if (error) {
      console.log(error);
    } else if (data) {
      setProducts(data.products);
      setInventory(dataInventory?.inventories);
    } else if (dataInventory) {
      setInventory(dataInventory?.inventories);
    }
  }, [data, setProducts, products, error, dataInventory, setInventory]);

  const hasCreamProducts = data?.products.filter(
    (item) => item?.category.name === "Cream"
  );
  return (
    <div>
      {hasCreamProducts && (
        <CreamList hasCreamProducts={hasCreamProducts} inventory={inventory} />
      )}
    </div>
  );
}
const CreamList = ({ hasCreamProducts, inventory }) => (
  <div className={cx("wrapper")}>
    {hasCreamProducts?.map((product) => {
      const inventoryData = inventory?.find(
        (inventory) => inventory.productId === product.id
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
export default Cream;
