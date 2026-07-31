import { useParams } from "react-router-dom";
import WeeklyReportDetailCard from "../../components/weeklyReports/WeeklyReportDetailCard/WeeklyReportDetailCard";

function WeeklyReportDetail() {
  const { id } = useParams();

  return <WeeklyReportDetailCard reportId={id} />;
}

export default WeeklyReportDetail;