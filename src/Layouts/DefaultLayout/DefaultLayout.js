import classNames from "classnames/bind";
import Navbar from "../components/Navbar/Navbar";
import SideBar from "../components/Sidebar/Sidebar";
import styles from "./DefaultLayout.module.scss";
const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
  return (
    <div className={cx("wrapper")}>
      <Navbar />
      <div className={cx("content")}>
        <SideBar />
        <div className={cx("page")}>{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
