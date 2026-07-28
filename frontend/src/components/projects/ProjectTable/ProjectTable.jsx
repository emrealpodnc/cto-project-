import "./ProjectTable.css";
import ProgressBar from "../../ProgressBar/ProgressBar";

import {
  MdVisibility,
  MdEdit,
  MdDelete,
  MdPerson,
} from "react-icons/md";

import { useEffect, useState } from "react";
import { getProjects } from "../../../services/projectService";

function ProjectTable() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await getProjects();
        console.log(data);
        setProjects(data);
      } catch (error) {
        console.error("Projeler alınamadı:", error);
      }
    };

    loadProjects();
  }, []);

  return (
    <div className="project-table-container">
      <table className="project-table">
        <thead>
          <tr>
            <th>Proje</th>
            <th>Yönetici</th>
            <th>Durum</th>
            <th>İlerleme</th>
            <th>Bitiş Tarihi</th>
            <th>İşlemler</th>
          </tr>
        </thead>

        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>{project.projeAdi}</td>

              <td>
                <div className="manager-info">
                  <MdPerson className="manager-icon" />
                  <span>{project.projeYoneticisiAdi}</span>
                </div>
              </td>

              <td>
                <span className="status active">
                  {project.durum}
                </span>
              </td>

              <td>
                <ProgressBar
                  progress={project.tamamlanmaYuzdesi}
                />
              </td>

              <td>{project.bitisTarihi}</td>

              <td>
                <div className="action-buttons">
                  <button className="view-btn">
                    <MdVisibility />
                  </button>

                  <button className="edit-btn">
                    <MdEdit />
                  </button>

                  <button className="delete-btn">
                    <MdDelete />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProjectTable;