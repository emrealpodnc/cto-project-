import "./WeeklyReportDetailCard.css";
import { useEffect, useState } from "react";
import { getWeeklyReportById } from "../../../services/weeklyReportService";
import Sidebar from "../../Sidebar/Sidebar";
import Header from "../../Header/Header";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
function WeeklyReportDetailCard({ reportId }) {

    const [report, setReport] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {

        const loadReport = async () => {

            try {

                const data = await getWeeklyReportById(reportId);

                setReport(data);

            } catch (error) {

                console.error(error);
                alert("Rapor yüklenemedi.");

            }

        };

        loadReport();

    }, [reportId]);

    if (!report) {
        return <h2>Yükleniyor...</h2>;
    }

    return (

        <div className="dashboard-layout">

            <Sidebar />

            <div className="dashboard-content">

                <Header />

                <div className="detail-container">

                    <h2>Haftalık Rapor Detayı</h2>

                    <div className="detail-card">

                        <div className="detail-item">
                            <strong>Proje :</strong>
                            <span>{report.projeAdi}</span>
                        </div>

                        <div className="detail-item">
                            <strong>Hafta No :</strong>
                            <span>{report.haftaNo}</span>
                        </div>

                        <div className="detail-item">
                            <strong>Rapor Tarihi :</strong>
                            <span>{report.raporTarihi}</span>
                        </div>

                        <div className="detail-item">
                            <strong>Tamamlanma :</strong>
                            <span>%{report.tamamlanmaYuzdesi}</span>
                        </div>

                        <div className="detail-item">
                            <strong>Bu Hafta Yapılanlar :</strong>
                            <p>{report.buHaftaYapilanlar}</p>
                        </div>

                        <div className="detail-item">
                            <strong>Devam Eden İşler :</strong>
                            <p>{report.devamEdenIsler}</p>
                        </div>

                        <div className="detail-item">
                            <strong>Riskler :</strong>
                            <p>{report.riskler}</p>
                        </div>

                        <div className="detail-item">
                            <strong>Engeller :</strong>
                            <p>{report.engeller}</p>
                        </div>

                        <div className="detail-item">
                            <strong>Gelecek Hafta Planı :</strong>
                            <p>{report.gelecekHaftaPlani}</p>
                        </div>

                        <div className="detail-item">
                            <strong>Genel Not :</strong>
                            <p>{report.genelNot}</p>
                        </div>
                        <div className="detail-footer">

                        <button
                        type="button"
                        className="back-btn"
                        onClick={() => navigate("/weekly-reports")}>
                        <FaArrowLeft />
                        Haftalık Raporlara Dön
                        </button>

                     </div>
                    </div>

                </div>

            </div>

        </div>

    );

}

export default WeeklyReportDetailCard;