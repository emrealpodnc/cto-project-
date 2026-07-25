import ProgressBar from "../../ProgressBar/ProgressBar";
import "./ProjectTable.css";
import {
  MdVisibility,
  MdEdit,
  MdDelete
} from "react-icons/md";
import { MdPerson } from "react-icons/md";
function ProjectTable() {
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
          <tr>
 <td>CTO Takip Sistemi</td>
            <td>
  <div className="manager-info">
    <MdPerson className="manager-icon" />
    <span>Emre Yılmaz</span>
  </div>
</td>
            <td>
              <span className="status active">Devam Ediyor</span>
            </td>
            <td>
  <ProgressBar progress={75} />
</td>
            <td>15.08.2026</td>
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

          <tr>
 <td>ERP Entegrasyonu</td>
            <td>
  <div className="manager-info">
    <MdPerson className="manager-icon" />
    <span>Ayşenur Demir</span>
  </div>
</td>
            <td>
              <span className="status risk">Riskli</span>
            </td>
            <td>
  <ProgressBar progress={40} />
</td>
            <td>25.08.2026</td>
            <td>
              <button>Detay</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ProjectTable;