import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

import {
  MdDashboard,
  MdFolder,
  MdDescription,
  MdPeople,
  MdSettings,
  MdLogout,
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
    <h2>CTO</h2>
    <p>Proje Takip Sistemi</p>
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

        <NavLink to="/weekly-reports" className="menu-item">
  <MdDescription />
  <span>Haftalık Raporlar</span>
</NavLink>

    {rol === "ADMIN" && (
  <NavLink to="/users" className="menu-item">
    <MdPeople />
    <span>Kullanıcılar</span>
  </NavLink>
)}
       {(rol === "ADMIN" || rol === "CTO") && (
  <NavLink to="/settings" className="menu-item">
    <MdSettings />
    <span>Ayarlar</span>
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