import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import images from "~/assets/Images/Image";
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
          to={configs.routes.product}
          title="Home"
          icon={<HomeIcons />}
        ></MenuItem>
        <MenuItem
          to={configs.routes.menu}
          title="Menu"
          icon={<MenuIcon />}
        ></MenuItem>
        <MenuItem
          to={configs.routes.orderstepper}
          title="Order"
          icon={<OrderIcon />}
        ></MenuItem>
        <MenuItem
          to={configs.routes.history}
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
          <MenuItem
            to={configs.routes.setting}
            title="Setting"
            icon={<SettingIcon />}
          ></MenuItem>
          {currentUser && (
            <MenuItem title="LogOut" icon={<LogoutIcon />}></MenuItem>
          )}
        </Menu>
      </div>
    </div>
  );
}

export default SideBar;
