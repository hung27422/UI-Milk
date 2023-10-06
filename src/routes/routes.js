import DetailProduct from "../Pages/DetailProduct/DetailProduct";
import Product from "../Pages/Product/Product";
import configs from "../configs";
import History from "~/Pages/History/History";
import Order from "~/Pages/Order/Order";
import Menu from "~/Pages/Menu/Menu";
import Setting from "~/Pages/Setting/Setting";
const publicRoutes = [
  { path: configs.routes.product, component: Product },
  { path: configs.routes.detailproduct, component: DetailProduct },
  { path: configs.routes.history, component: History },
  { path: configs.routes.order, component: Order },
  { path: configs.routes.menu, component: Menu },
  { path: configs.routes.setting, component: Setting },
];
export default publicRoutes;
