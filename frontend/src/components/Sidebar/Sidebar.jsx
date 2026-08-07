import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

import {
  MdDashboard,
  MdFolder,
  MdDescription,
  MdPeople,
  MdLogout,
  MdAddCircle,
} from "react-icons/md";
function Sidebar() {
  const rol = localStorage.getItem("rol");
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
  logout();
  navigate("/");
};
  return (
    <aside className="sidebar">

  <div className="logo">
    <div className="logo-icon">
        <MdDashboard />
    </div>

    <div className="logo-text">
        <h2>Proje</h2>
        <p>Takip Sistemi</p>
    </div>
</div>

      <ul>

        <NavLink to="/dashboard" className="menu-item">
  <MdDashboard />
  <span>Ana Sayfa</span>
</NavLink>
        <NavLink to="/projects" className="menu-item">
          <MdFolder />
          <span>Projeler</span>
        </NavLink>

{(rol === "ADMIN" || rol === "CTO") && (
  <NavLink to="/projects/new" className="menu-item sub-menu">
    <MdAddCircle />
    <span>Yeni Proje</span>
  </NavLink>
)} 
        <NavLink to="/weekly-reports" className="menu-item">
  <MdDescription />
  <span>Haftalık Raporlar</span>
</NavLink>
{(rol === "ADMIN" ||
  rol === "CTO" ||
  rol === "PROJECT_MANAGER") && (
  <NavLink
    to="/weekly-reports/new"
    className="menu-item sub-menu"
  >
    <MdAddCircle />
    <span>Yeni Haftalık Rapor</span>
  </NavLink>
)}

    {rol === "ADMIN" && (
  <NavLink to="/users" className="menu-item">
    <MdPeople />
    <span>Kullanıcılar</span>
  </NavLink>
)}
        <li className="logout" onClick={handleLogout}>
  <MdLogout />
  <span>Çıkış Yap</span>
</li>

      </ul>

    </aside>
  );
}

export default Sidebar;
