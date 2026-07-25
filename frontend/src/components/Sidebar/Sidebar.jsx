import { NavLink } from "react-router-dom";

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

        <NavLink to="/reports" className="menu-item">
  <MdDescription />
  <span>Haftalık Raporlar</span>
</NavLink>

    <NavLink to="/users" className="menu-item">
  <MdPeople />
  <span>Kullanıcılar</span>
</NavLink>
       <NavLink to="/settings" className="menu-item">
  <MdSettings />
  <span>Ayarlar</span>
</NavLink>
        <li className="logout">
          <MdLogout />
          <span>Çıkış Yap</span>
        </li>

      </ul>

    </aside>
  );
}

export default Sidebar;