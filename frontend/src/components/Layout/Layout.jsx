import "./Layout.css";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";

function Layout({ children, showHeader = true }) {
  return (
    <div className="dashboard-layout">

      <Sidebar />

      <div className="dashboard-content">

        {showHeader && <Header />}

        {children}

      </div>

    </div>
  );
}

export default Layout;