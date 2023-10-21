import classNames from "classnames/bind";
import styles from "./Profile.module.scss";
import SidebarProfile from "~/components/SidebarProfile/SidebarProfile";
const cx = classNames.bind(styles);
function Profile() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("side-bar")}></div>
    </div>
  );
}

export default Profile;
