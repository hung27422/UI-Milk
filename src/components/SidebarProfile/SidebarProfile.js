import classNames from "classnames/bind";
import styles from "./SidebarProfile.module.scss";
import Menu from "~/Layouts/components/Sidebar/Menu/Menu";
import MenuItem from "~/Layouts/components/Sidebar/Menu/MenuItems/MenuItem";
import { LocationIcon, LogoutIcon, UserIcon } from "../Icons/Icons";
import configs from "~/configs";
import { useAuth0 } from "@auth0/auth0-react";
const cx = classNames.bind(styles);
function SidebarProfile() {
  const { logout } = useAuth0();
  const logoutWithRedirect = () =>
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <Menu>
          <h2 className={cx("title")}>User Profile</h2>
          <div className={cx("top")}>
            <MenuItem
              to={configs.routes.userinfo}
              icon={<UserIcon />}
              title={"User Info"}
            />
            <MenuItem
              to={configs.routes.userlocation}
              icon={<LocationIcon />}
              title={"Địa chỉ"}
            />
          </div>
          <div className={cx("bot")}>
            <MenuItem
              logOut
              icon={<LogoutIcon />}
              title={"LogOut"}
              onClick={() => logoutWithRedirect()}
            />
          </div>
        </Menu>
      </div>
    </div>
  );
}

export default SidebarProfile;
