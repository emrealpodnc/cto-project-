import "./Dashboard.css";

import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";

import StatsCards from "../../components/dashboard/StatsCards/StatsCards";
import UpcomingDeadlines from "../../components/dashboard/UpcomingDeadlines/UpcomingDeadlines";

function Dashboard() {
  return (
    <div className="dashboard-layout">

      <Sidebar />

      <div className="dashboard-content">

        <Header />

        <StatsCards />

        <UpcomingDeadlines />

      </div>

    </div>
  );
}

export default Dashboard;