import "./UpcomingDeadlines.css";
import { MdEvent } from "react-icons/md";

function UpcomingDeadlines() {
  return (
    <div className="upcoming-deadlines">

      <div className="section-header">
    <h2 >
    <MdEvent />
    Yaklaşan Teslim Tarihleri
</h2>

        <span className="view-all">
    Tümünü Gör →
</span>
      </div>

      <table>

        <thead>
          <tr>
            <th>Proje</th>
            <th>Teslim Tarihi</th>
          </tr>
        </thead>

        <tbody>

          <tr>
            <td>ERP Sistemi</td>
            <td>25.07.2026</td>
          </tr>

          <tr>
            <td>Mobil Uygulama</td>
            <td>28.07.2026</td>
          </tr>

          <tr>
            <td>CRM Sistemi</td>
            <td>02.08.2026</td>
          </tr>

          <tr>
            <td>Web Portal</td>
            <td>05.08.2026</td>
          </tr>

        </tbody>

      </table>

    </div>
  );
}

export default UpcomingDeadlines;