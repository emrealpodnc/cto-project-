import "./StatsCards.css";
import DashboardCard from "../../DashboardCard/DashboardCard";

function StatsCards() {
  return (
    <div className="stats-cards">

      <DashboardCard
        title="Toplam Proje"
        value="12"
        color="#2563eb"
      />

      <DashboardCard
        title="Devam Eden"
        value="7"
        color="#16a34a"
      />

      <DashboardCard
        title="Tamamlanan"
        value="3"
        color="#9333ea"
      />

      <DashboardCard
        title="Riskli"
        value="2"
        color="#dc2626"
      />

    </div>
  );
}

export default StatsCards;