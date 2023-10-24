import classNames from "classnames/bind";
import styles from "./Milk.module.scss";
import ProductItem from "~/components/ProductItem/ProductItem";
import { useContext, useEffect } from "react";
import { MilkContext } from "~/components/ContextMilk/ContextMilk";
import { gql, useQuery } from "@apollo/client";

const cx = classNames.bind(styles);

function Milk() {
  const { products, setProducts } = useContext(MilkContext);
  const { data } = useQuery(gql`
    query Products {
      products {
        categoryId
        description
        id
        images
        name
        price
        sku
      }
    }
  `);

  useEffect(() => {
    if (data) {
      setProducts(data.products);
    }
  }, [data, setProducts, products]);
  return (
    <div className={cx("wrapper")}>
      {products?.map((product) => (
        <ProductItem data={product} key={product.id} />
      ))}
    </div>
  );
}

export default Milk;
