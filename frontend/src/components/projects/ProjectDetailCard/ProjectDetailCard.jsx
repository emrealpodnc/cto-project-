import "./ProjectDetailCard.css";
import { useEffect, useState } from "react";
import { getProjectById } from "../../../services/projectService";
import Sidebar from "../../Sidebar/Sidebar";
import Header from "../../Header/Header";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
function ProjectDetailCard({ projectId }) {

    const [project, setProject] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {

        const loadProject = async () => {

            try {

                const data = await getProjectById(projectId);

                setProject(data);

            } catch (error) {

                console.error(error);
                alert("Proje bilgileri yüklenemedi.");
            }

        };

        loadProject();

    }, [projectId]);

    if (!project) {
        return <h2>Yükleniyor...</h2>;
    }

    return (

        <div className="dashboard-layout">

            <Sidebar />

            <div className="dashboard-content">

                <Header />

                <div className="detail-container">

                    <h2>Proje Detayı</h2>

                    <div className="detail-card">

                        <div className="detail-item">
                            <strong>Proje Adı</strong>
                            <span>{project.projeAdi}</span>
                        </div>

                        <div className="detail-item">
                            <strong>Açıklama</strong>
                            <p>{project.aciklama}</p>
                        </div>

                        <div className="detail-item">
                            <strong>Durum</strong>
                            <span>{project.durum}</span>
                        </div>

                        <div className="detail-item">
                            <strong>Öncelik</strong>
                            <span>{project.oncelik}</span>
                        </div>

                        <div className="detail-item">
                            <strong>Proje Yöneticisi</strong>
                            <span>{project.projeYoneticisi}</span>
                        </div>

                        <div className="detail-item">
                            <strong>Tamamlanma Yüzdesi</strong>
                            <span>%{project.tamamlanmaYuzdesi}</span>
                        </div>

                        <div className="detail-item">
                            <strong>Başlangıç Tarihi</strong>
                            <span>{project.baslangicTarihi}</span>
                        </div>

                        <div className="detail-item">
                            <strong>Bitiş Tarihi</strong>
                            <span>{project.bitisTarihi}</span>
                        </div>

                        
                        <div className="detail-footer">

                        <button
                        className="back-btn"
                        onClick={() => navigate("/projects")}>
                        <FaArrowLeft />
                        Projelere Dön
                        </button>   
                         
                        </div>
                    </div>

                </div>

            </div>

        </div>

    );

}

export default ProjectDetailCard;