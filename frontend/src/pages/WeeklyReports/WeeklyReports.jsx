import "./WeeklyReports.css";
import { useState } from "react";

import Layout from "../../components/Layout/Layout";

import WeeklyReportToolbar from "../../components/weeklyReports/WeeklyReportToolbar/WeeklyReportToolbar";
import WeeklyReportTable from "../../components/weeklyReports/WeeklyReportTable/WeeklyReportTable";

function WeeklyReports() {

  const [aramaMetni, setAramaMetni] = useState("");

  return (
    <Layout>

      <WeeklyReportToolbar
        aramaMetni={aramaMetni}
        setAramaMetni={setAramaMetni}
      />

      <WeeklyReportTable
        aramaMetni={aramaMetni}
      />

    </Layout>
  );
}

export default WeeklyReports;