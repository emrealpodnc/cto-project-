import "./WeeklyReports.css";

import Layout from "../../components/Layout/Layout";

import WeeklyReportToolbar from "../../components/weeklyReports/WeeklyReportToolbar/WeeklyReportToolbar";
import WeeklyReportTable from "../../components/weeklyReports/WeeklyReportTable/WeeklyReportTable";

function WeeklyReports() {
  return (
  <Layout>

    <WeeklyReportToolbar />

    <WeeklyReportTable />

  </Layout>
);
}

export default WeeklyReports;