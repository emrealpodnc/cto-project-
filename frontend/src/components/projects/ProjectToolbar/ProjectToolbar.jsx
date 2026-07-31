import "./ProjectToolbar.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
function ProjectToolbar({
  durumFiltresi,
  setDurumFiltresi,
  aramaMetni,
  setAramaMetni
}) {
  const navigate = useNavigate();
  const { rol } = useAuth();
  const handleNewProjectClick = () => {
    navigate("/projects/new");
  };

  return (
    <div className="project-toolbar">

      <h2>📁 Projeler</h2>

      <div className="toolbar-actions">

        <input
  type="text"
  placeholder="🔍 Proje Ara..."
  value={aramaMetni}
  onChange={(e) => setAramaMetni(e.target.value)}
/>
        <select
  value={durumFiltresi}
  onChange={(e) => setDurumFiltresi(e.target.value)}
>
  <option value="">Tüm Durumlar</option>
  <option value="DEVAM_EDIYOR">Devam Ediyor</option>
  <option value="TAMAMLANDI">Tamamlandı</option>
  <option value="RISKLI">Riskli</option>
  <option value="PLANLANDI">Planlandı</option>
  <option value="BEKLEMEDE">Beklemede</option>
</select>

     {(rol === "ADMIN" || rol === "CTO") && (
  <button onClick={handleNewProjectClick}>
    + Yeni Proje
  </button>
)}

      </div>

    </div>
  );
}

export default ProjectToolbar;