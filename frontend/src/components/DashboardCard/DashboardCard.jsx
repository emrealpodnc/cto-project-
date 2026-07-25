import "./DashboardCard.css";
import {
  MdFolder,
  MdPending,
  MdCheckCircle,
  MdWarning,
} from "react-icons/md";
function DashboardCard({ title, value, color }) {
  
  let icon;

switch (title) {
  case "Toplam Proje":
    icon = <MdFolder />;
    break;

  case "Devam Eden":
    icon = <MdPending />;
    break;

  case "Tamamlanan":
    icon = <MdCheckCircle />;
    break;

  case "Riskli":
    icon = <MdWarning />;
    break;

  default:
    icon = null;
}
  
  return (
  <div
    className="dashboard-card"
    style={{ borderLeft: `6px solid ${color}` }}
  >
    <div className="card-header">
      <span>{icon}</span>
      <h3>{title}</h3>
    </div>

    <div className="card-content">
      <h2>{value}</h2>
    </div>
  </div>
);
}

export default DashboardCard;