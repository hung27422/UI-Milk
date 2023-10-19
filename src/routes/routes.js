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
import OrderDone from "~/Pages/OrderStep/components/OrderDone/OrderDone";
import DetailOrder from "~/Pages/DetailOrder/DetailOrder";
import Shipment from "~/Pages/DetailOrder/components/Shipment/Shipment";
import DoneOrder from "~/Pages/DetailOrder/components/ConfirmDoneOrder/ConfirmDoneOrder";
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
  { path: configs.routes.orderdone, component: OrderDone },
  { path: configs.routes.detailorder, component: DetailOrder },
  { path: configs.routes.shipment, component: Shipment },
  { path: configs.routes.confirmorderdone, component: DoneOrder },
];
export default publicRoutes;
