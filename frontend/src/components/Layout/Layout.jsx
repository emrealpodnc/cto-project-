import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

function Layout({ children }) {
  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-content">
        <Header />

        {children}
      </div>
    </div>
  );
}

export default Layout;