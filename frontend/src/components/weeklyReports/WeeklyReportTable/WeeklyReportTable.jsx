import "./WeeklyReportTable.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import {
  MdVisibility,
  MdEdit,
  MdDelete,
} from "react-icons/md";

import { useEffect, useState } from "react";

import {
  getWeeklyReports,
  deleteWeeklyReport,
} from "../../../services/weeklyReportService";

function WeeklyReportTable() {

  const [reports, setReports] = useState([]);

  const navigate = useNavigate();
  const { rol, kullaniciAdi } = useAuth();
  const loadReports = async () => {
    try {
      const data = await getWeeklyReports();
      setReports(data);
    } catch (error) {
      console.error("Raporlar alınamadı:", error);
    }
  };

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Bu raporu silmek istediğinize emin misiniz?"
    );

    if (!confirmDelete) return;

    try {

      await deleteWeeklyReport(id);

      alert("Rapor başarıyla silindi.");

      loadReports();

    } catch (error) {

      console.error(error);

      alert("Rapor silinemedi.");

    }

  };

  useEffect(() => {
    loadReports();
  }, []);

  return (
    <div className="project-table-container">

      <table className="project-table">

        <thead>

          <tr>

            <th>Proje</th>
            <th>Hafta</th>
            <th>Tarih</th>
            <th>Tamamlanma</th>
            <th>Riskler</th>
            <th>İşlemler</th>

          </tr>

        </thead>

        <tbody>

          {reports.map((report) => (

            <tr key={report.id}>

              <td>{report.projeAdi}</td>

              <td>{report.haftaNo}</td>

              <td>{report.raporTarihi}</td>

              <td>%{report.tamamlanmaYuzdesi}</td>

              <td>{report.riskler}</td>

              <td>

                <div className="action-buttons">

                  <button
    className="view-btn"
    onClick={() => navigate(`/weekly-reports/${report.id}`)}
>
    <MdVisibility />
</button>

                  {(rol === "ADMIN" || rol === "CTO") && (
  <button
    className="edit-btn"
    onClick={() =>
      navigate(`/weekly-reports/edit/${report.id}`)
    }
  >
    <MdEdit />
  </button>
)}

                  {(rol === "ADMIN" || rol === "CTO") && (
  <button
    className="delete-btn"
    onClick={() => handleDelete(report.id)}
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

export default WeeklyReportTable;