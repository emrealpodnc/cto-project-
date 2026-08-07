import { useParams } from "react-router-dom";
import WeeklyReportForm from "../../components/weeklyReports/WeeklyReportForm/WeeklyReportForm";
import { FaArrowLeft } from "react-icons/fa";
function EditWeeklyReport() {
  const { id } = useParams();

  return <WeeklyReportForm reportId={id} />;
}
<div className="detail-footer">

    <button
        type="button"
        className="back-btn"
        onClick={() => navigate("/weekly-reports")}
    >
        <FaArrowLeft />
        Haftalık Raporlara Dön
    </button>

</div>
export default EditWeeklyReport;