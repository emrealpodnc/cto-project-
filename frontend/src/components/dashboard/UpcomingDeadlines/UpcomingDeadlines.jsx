import "./UpcomingDeadlines.css";
import { MdEvent } from "react-icons/md";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import {
    getUpcomingDeadlines,
    getUpcomingDeadlinesByManager
} from "../../../services/dashboardService";

function UpcomingDeadlines() {
  const [projects, setProjects] = useState([]);

const { rol, kullaniciId } = useAuth();
useEffect(() => {

    const loadProjects = async () => {

        try {

            let data;

            if (rol === "PROJECT_MANAGER") {

                data = await getUpcomingDeadlinesByManager(kullaniciId);

            } else {

                data = await getUpcomingDeadlines();

            }

            setProjects(data);

        } catch (error) {

            console.error("Yaklaşan teslim tarihleri yüklenemedi.", error);

        }

    };

    loadProjects();

}, [rol, kullaniciId]);

const formatDate = (date) => {

    return new Date(date).toLocaleDateString("tr-TR");

};

const getDeadlineClass = (date) => {

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const deadline = new Date(date);

    deadline.setHours(0, 0, 0, 0);

    const diffDays = Math.ceil(
        (deadline - today) / (1000 * 60 * 60 * 24)
    );

    if (diffDays <= 0) return "deadline-red";

    if (diffDays <= 7) return "deadline-orange";

    return "deadline-green";

};
const getRemainingText = (date) => {

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const deadline = new Date(date);

    deadline.setHours(0, 0, 0, 0);

    const diffDays = Math.ceil(
        (deadline - today) / (1000 * 60 * 60 * 24)
    );

    if (diffDays < 0) {

        return `${Math.abs(diffDays)} gün gecikti`;

    }

    if (diffDays === 0) {

        return "Bugün";

    }

    if (diffDays === 1) {

        return "1 gün kaldı";

    }

    return `${diffDays} gün kaldı`;

};
  return (
    <div className="upcoming-deadlines">

      <div className="section-header">
    <h2 >
    <MdEvent />
    Yaklaşan Teslim Tarihleri
</h2>

      </div>

      <table>

        <thead>
          <tr>
            <th>Proje</th>
            <th>Teslim Tarihi</th>
          </tr>
        </thead>

        <tbody>

         {projects.map((project) => (

    <tr key={project.id}>

        <td>{project.projeAdi}</td>

        <td>

    <div className={getDeadlineClass(project.bitisTarihi)}>

        <div>{formatDate(project.bitisTarihi)}</div>

        <small>{getRemainingText(project.bitisTarihi)}</small>

    </div>

</td>
    </tr>

))}
        </tbody>

      </table>

    </div>
  );
}

export default UpcomingDeadlines;