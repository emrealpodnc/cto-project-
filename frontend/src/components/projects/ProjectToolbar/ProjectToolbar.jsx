import "./ProjectToolbar.css";
import { useNavigate } from "react-router-dom";

function ProjectToolbar() {
  const navigate = useNavigate();

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
        />

        <select>

          <option>Tüm Durumlar</option>

          <option>Devam Ediyor</option>

          <option>Tamamlandı</option>

          <option>Riskli</option>

        </select>

        <button onClick={() => navigate("/projects/new")}>
  + Yeni Proje
</button>

      </div>

    </div>
  );
}

export default ProjectToolbar;