import "./Dashboard.css";

import StatsCards from "../../components/dashboard/StatsCards/StatsCards";
import UpcomingDeadlines from "../../components/dashboard/UpcomingDeadlines/UpcomingDeadlines";
import Layout from "../../components/Layout/Layout";

function Dashboard() {
  return (
    <Layout>

      <StatsCards />

      <UpcomingDeadlines />

    </Layout>
  );
}

export default Dashboard;