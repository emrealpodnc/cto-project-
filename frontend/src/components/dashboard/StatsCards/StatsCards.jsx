import "./StatsCards.css";
import DashboardCard from "../../DashboardCard/DashboardCard";
import { useEffect, useState } from "react";
import {
    getDashboard,
    getDashboardByManager
} from "../../../services/dashboardService";

import { useAuth } from "../../../context/AuthContext";

function StatsCards(){
  const { rol, kullaniciId } = useAuth();
 const [dashboard, setDashboard] = useState({
    toplamProje: 0,
    devamEdenProje: 0,
    planlananProje: 0,
    beklemedeProje: 0,
    tamamlananProje: 0,
    riskliProje: 0,
    yuksekOncelikliProje: 0,
    buHaftaEklenenRapor: 0,
});

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        let data;

if (rol === "PROJECT_MANAGER") {
    data = await getDashboardByManager(kullaniciId);
} else {
    data = await getDashboard();
}

setDashboard(data);

      } catch (error) {
        console.error("Dashboard verisi alınamadı:", error);
      }
    };

    loadDashboard();
 }, [rol, kullaniciId]);

  return (
    <div className="stats-cards">

<DashboardCard
    title="Toplam Proje"
    value={dashboard.toplamProje}
    color="#2563EB"
/>
<DashboardCard
    title="Devam Eden"
    value={dashboard.devamEdenProje}
    color="#F97316"
/>

<DashboardCard
    title="Planlanan"
    value={dashboard.planlananProje}
    color="#6B7280"
/>
<DashboardCard
    title="Beklemede"
    value={dashboard.beklemedeProje}
    color="#9CA3AF"
/>

<DashboardCard
    title="Riskli"
    value={dashboard.riskliProje}
    color="#DC2626"
/>

<DashboardCard
    title="Tamamlandı"
    value={dashboard.tamamlananProje}
    color="#16A34A"
/>

<DashboardCard
    title="Bu Hafta Eklenen Rapor"
    value={dashboard.buHaftaEklenenRapor}
    color="#EAB308"
/>
<DashboardCard
    title="Yüksek Öncelik"
    value={dashboard.yuksekOncelikliProje}
    color="#7C3AED"
/>

    </div>
  );
}

export default StatsCards;