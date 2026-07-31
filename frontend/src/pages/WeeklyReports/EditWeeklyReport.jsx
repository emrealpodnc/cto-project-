import { useParams } from "react-router-dom";
import WeeklyReportForm from "../../components/weeklyReports/WeeklyReportForm/WeeklyReportForm";

function EditWeeklyReport() {
  const { id } = useParams();

  return <WeeklyReportForm reportId={id} />;
}

export default EditWeeklyReport;