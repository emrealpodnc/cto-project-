import "./StatsCards.css";
import DashboardCard from "../../DashboardCard/DashboardCard";
import { useEffect, useState } from "react";
import { getDashboard } from "../../../services/dashboardService";

function StatsCards() {
  const [dashboard, setDashboard] = useState({
    toplamProje: 0,
    devamEdenProje: 0,
    tamamlananProje: 0,
    riskliProje: 0,
    toplamRapor: 0,
  });

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const data = await getDashboard();
        setDashboard(data);
      } catch (error) {
        console.error("Dashboard verisi alınamadı:", error);
      }
    };

    loadDashboard();
  }, []);

  return (
    <div className="stats-cards">

   <DashboardCard
  title="Toplam Proje"
  value={dashboard.toplamProje}
  color="#2563eb"
/>

<DashboardCard
  title="Devam Eden"
  value={dashboard.devamEdenProje}
  color="#16a34a"
/>

<DashboardCard
  title="Tamamlanan"
  value={dashboard.tamamlananProje}
  color="#9333ea"
/>

<DashboardCard
  title="Riskli"
  value={dashboard.riskliProje}
  color="#dc2626"
/>

    </div>
  );
}

export default StatsCards;