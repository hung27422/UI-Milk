import Navbar from "../components/Navbar/Navbar";
import SideBar from "../components/Sidebar/Sidebar";
function DefaultLayout({ children }) {
  return (
    <div>
      <Navbar />
      <SideBar />
      {children}
    </div>
  );
}

export default DefaultLayout;
