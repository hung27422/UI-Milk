import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import configs from "~/configs";
import {
  HomeIcons,
  MenuIcon,
  OrderIcon,
  HistoryIcon,
  SettingIcon,
  LogoutIcon,
} from "~/components/Icons";
import Menu from "./Menu/Menu";
import MenuItem from "./Menu/MenuItems/MenuItem";
import { MilkContext } from "~/components/ContextMilk/ContextMilk";
import { useContext } from "react";
const cx = classNames.bind(styles);

const Container = () => {
  return (
    <div>
      <Menu>
        <MenuItem
          id="Home"
          to={configs.routes.product}
          title="Home"
          icon={<HomeIcons />}
        ></MenuItem>
        <MenuItem id="Menu" to={configs.routes.menu} title="Menu" icon={<MenuIcon />}></MenuItem>
        <MenuItem
          id="Order"
          to={configs.routes.orderstepper}
          title="Order"
          icon={<OrderIcon />}
        ></MenuItem>
        <MenuItem
          id="History"
          to={configs.routes.detailorder}
          title="History"
          icon={<HistoryIcon />}
        ></MenuItem>
      </Menu>
    </div>
  );
};

function SideBar() {
  const { currentUser } = useContext(MilkContext);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <Container />
      </div>
      <div className={cx("bottom-action")}>
        <Menu>
          <MenuItem to={configs.routes.setting} title="Setting" icon={<SettingIcon />}></MenuItem>
          {currentUser && <MenuItem title="LogOut" icon={<LogoutIcon />}></MenuItem>}
        </Menu>
      </div>
    </div>
  );
}

export default SideBar;
