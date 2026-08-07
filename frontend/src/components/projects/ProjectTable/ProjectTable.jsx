import "./ProjectTable.css";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../../ProgressBar/ProgressBar";
import { useAuth } from "../../../context/AuthContext";
import {
  MdVisibility,
  MdEdit,
  MdDelete,
  MdPerson,
} from "react-icons/md";

import { useEffect, useState } from "react";
import {
  getProjects,
  getProjectsByManager,
  deleteProject,
} from "../../../services/projectService";

function ProjectTable({
    durumFiltresi,
    oncelikFiltresi,
    yoneticiFiltresi,
    aramaMetni
}) {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const { rol, kullaniciId } = useAuth();

  const loadProjects = async () => {
    try {
      let data;

      if (rol === "PROJECT_MANAGER") {
        data = await getProjectsByManager(kullaniciId);
      } else {
        data = await getProjects();
      }

      setProjects(data);
    } catch (error) {
      console.error("Projeler alınamadı:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Bu projeyi silmek istediğinize emin misiniz?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProject(id);

      alert("Proje başarıyla silindi.");

      loadProjects();
    } catch (error) {
      console.error(error);
      alert("Proje silinemedi.");
    }
  };

  // Kalan Süre Hesaplama
  const getDeliveryStatus = (project) => {
    if (project.durum === "TAMAMLANDI") {
      return {
        text: "Tamamlandı",
        className: "delivery-completed",
      };
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const deadline = new Date(project.bitisTarihi);
    deadline.setHours(0, 0, 0, 0);

    const diffDays = Math.ceil(
      (deadline - today) / (1000 * 60 * 60 * 24)
    );

    if (diffDays < 0) {
      return {
        text: `${Math.abs(diffDays)} gün gecikti`,
        className: "delivery-late",
      };
    }

    if (diffDays === 0) {
      return {
        text: "Bugün teslim",
        className: "delivery-today",
      };
    }

    return {
      text: `${diffDays} gün kaldı`,
      className: "delivery-normal",
    };
  };

  useEffect(() => {
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
            <th>Kalan Süre</th>
            <th>İşlemler</th>
          </tr>
        </thead>

        <tbody>
          {projects
            .filter((project) => {

    const durumUygun =
        durumFiltresi === "" ||
        project.durum === durumFiltresi;

    const oncelikUygun =
        oncelikFiltresi === "" ||
        project.oncelik === oncelikFiltresi;

    const yoneticiUygun =
        yoneticiFiltresi === "" ||
        project.projeYoneticisiId === Number(yoneticiFiltresi);

    const aramaUygun =
        project.projeAdi
            .toLowerCase()
            .includes(aramaMetni.toLowerCase());

    return (
        durumUygun &&
        oncelikUygun &&
        yoneticiUygun &&
        aramaUygun
    );

})
            .map((project) => (
              <tr key={project.id}>
                <td>{project.projeAdi}</td>

                <td>
                  <div className="manager-info">
                    <MdPerson className="manager-icon" />
                    <span>{project.projeYoneticisi}</span>
                  </div>
                </td>

                <td>
                  <span
                    className="status"
                    style={{
                      backgroundColor:
                        project.durum === "PLANLANDI"
                          ? "#F5F5F5"
                          : project.tamamlanmaYuzdesi <= 30
                          ? "#FFEBEE"
                          : project.tamamlanmaYuzdesi <= 70
                          ? "#FFF3E0"
                          : project.tamamlanmaYuzdesi < 100
                          ? "#E8F5E9"
                          : "#D0F0C0",

                      color:
                        project.durum === "PLANLANDI"
                          ? "#9CA3AF"
                          : project.tamamlanmaYuzdesi <= 30
                          ? "#C62828"
                          : project.tamamlanmaYuzdesi <= 70
                          ? "#EF6C00"
                          : project.tamamlanmaYuzdesi < 100
                          ? "#67af6b"
                          : "#02830b",
                    }}
                  >
                    {project.durum === "DEVAM_EDIYOR"
                      ? "Devam Ediyor"
                      : project.durum === "BEKLEMEDE"
                      ? "Beklemede"
                      : project.durum === "RISKLI"
                      ? "Riskli"
                      : project.durum === "TAMAMLANDI"
                      ? "Tamamlandı"
                      : "Planlandı"}
                  </span>
                </td>

                <td>
                  <ProgressBar
                    progress={project.tamamlanmaYuzdesi}
                  />
                </td>

                <td>{project.bitisTarihi}</td>

                <td>
                  <span
                    className={
                      getDeliveryStatus(project).className
                    }
                  >
                    {getDeliveryStatus(project).text}
                  </span>
                </td>

                <td>
                  <div className="action-buttons">
                    <button
                      className="view-btn"
                      onClick={() =>
                        navigate(`/projects/${project.id}`)
                      }
                    >
                      <MdVisibility />
                    </button>

                    {(rol === "ADMIN" ||
                      rol === "CTO" ||
                      rol === "PROJECT_MANAGER") && (
                      <button
                        className="edit-btn"
                        onClick={() =>
                          navigate(`/projects/edit/${project.id}`)
                        }
                      >
                        <MdEdit />
                      </button>
                    )}

                    {(rol === "ADMIN" || rol === "CTO") && (
                      <button
                        className="delete-btn"
                        onClick={() =>
                          handleDelete(project.id)
                        }
                      >
                        <MdDelete />
                      </button>
                    )}
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