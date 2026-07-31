import "./WeeklyReportToolbar.css";
import { useNavigate } from "react-router-dom";

function WeeklyReportToolbar() {
  const navigate = useNavigate();

  return (
    <div className="project-toolbar">

      <h2>📝 Haftalık Raporlar</h2>

      <div className="toolbar-actions">

        <input
          type="text"
          placeholder="🔍 Rapor Ara..."
        />

        <button onClick={() => navigate("/weekly-reports/new")}>
          + Yeni Rapor
        </button>

      </div>

    </div>
  );
}

export default WeeklyReportToolbar;