import classNames from "classnames/bind";
import styles from "./Milk.module.scss";
import ProductItem from "~/components/ProductItem/ProductItem";
import { useContext, useEffect } from "react";
import { MilkContext } from "~/components/ContextMilk/ContextMilk";
import { gql, useQuery } from "@apollo/client";

const cx = classNames.bind(styles);

function Milk() {
  const { products, setProducts } = useContext(MilkContext);
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
      console.log(products);
    }
  }, [data, setProducts, products, error]);
  return <MilkList products={products} />;
}
//Hiển thị
const MilkList = ({ products }) => (
  <div className={cx("wrapper")}>
    {products?.map((product) => (
      <ProductItem data={product} key={product.id} />
    ))}
  </div>
);
export default Milk;
