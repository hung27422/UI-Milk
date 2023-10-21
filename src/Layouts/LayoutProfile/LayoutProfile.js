import classNames from "classnames/bind";
import styles from "./LayoutProfile.module.scss";
import Navbar from "../components/Navbar/Navbar";
import SidebarProfile from "~/components/SidebarProfile/SidebarProfile";
const cx = classNames.bind(styles);
function LayoutProfile({ children }) {
  return (
    <div className={cx("wrapper")}>
      <Navbar />
      <div className={cx("content")}>
        <SidebarProfile />
        <div className={cx("page")}>{children}</div>
      </div>
    </div>
  );
}

export default LayoutProfile;
