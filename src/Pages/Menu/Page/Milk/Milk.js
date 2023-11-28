import classNames from "classnames/bind";
import styles from "./Milk.module.scss";
import ProductItem from "~/components/ProductItem/ProductItem";
import { useContext, useEffect } from "react";
import { MilkContext } from "~/components/ContextMilk/ContextMilk";
import { gql, useQuery } from "@apollo/client";
import useQueryInventories from "~/hooks/useQueryInventories";

const cx = classNames.bind(styles);

function Milk() {
  const { products, setProducts } = useContext(MilkContext);
  const { inventory, setInventory } = useContext(MilkContext);
  const { data: dataInventory } = useQueryInventories();
  const { data, error } = useQuery(
    gql`
      query Products($amount: Int!, $page: Int!) {
        products(amount: $amount, page: $page) {
          categoryId
          description
          id
          images
          name
          price
          sku
        }
      }
    `,
    {
      variables: {
        amount: 10,
        page: 1,
      },
    }
  );

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
  return <MilkList products={products} inventory={inventory} />;
}
//Hiển thị
const MilkList = ({ products, inventory }) => (
  <div className={cx("wrapper")}>
    {products?.map((product) => {
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
export default Milk;
