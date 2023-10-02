import DetailProduct from "../Pages/DetailProduct/DetailProduct";
import Product from "../Pages/Product/Product";
import configs from "../configs";
const publicRoutes = [
  { path: configs.routes.product, component: Product },
  { path: configs.routes.detailproduct, component: DetailProduct },
];
export default publicRoutes;
