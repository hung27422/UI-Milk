import DetailProduct from "../Pages/DetailProduct/DetailProduct";
import Product from "../Pages/Home/HomePage";
import configs from "../configs";
import History from "~/Pages/History/History";
import Order from "~/Pages/Order/Order";
import Menu from "~/Pages/Menu/Menu";
import Setting from "~/Pages/Setting/Setting";
import OrderStepper from "~/Pages/OrderStep/OrderStepper";
import Payment from "~/Pages/OrderStep/components/Payment";
import Delivery from "~/Pages/OrderStep/components/Delivery/Delivery";
const publicRoutes = [
  { path: configs.routes.product, component: Product },
  { path: configs.routes.detailproduct, component: DetailProduct },
  { path: configs.routes.history, component: History },
  { path: configs.routes.order, component: Order },
  { path: configs.routes.menu, component: Menu },
  { path: configs.routes.setting, component: Setting },
  { path: configs.routes.orderstepper, component: OrderStepper },
  { path: configs.routes.payment, component: Payment },
  { path: configs.routes.delivery, component: Delivery },
];
export default publicRoutes;
