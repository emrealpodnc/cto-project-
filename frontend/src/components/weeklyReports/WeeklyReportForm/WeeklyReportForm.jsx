import "./WeeklyReportForm.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import { useAuth } from "../../../context/AuthContext";

import {
    getProjects,
    getProjectsByManager
} from "../../../services/projectService";

import {
    createWeeklyReport,
    updateWeeklyReport,
    getWeeklyReportById
} from "../../../services/weeklyReportService";

function WeeklyReportForm({ reportId }) {

    const navigate = useNavigate();

    const { rol, kullaniciId } = useAuth();

    const [projects, setProjects] = useState([]);

    const [report, setReport] = useState({

        projectId: "",

        haftaNo: "",

        raporTarihi: "",

        tamamlanmaYuzdesi: 0,

        buHaftaYapilanlar: "",

        devamEdenIsler: "",

        riskler: "",

        engeller: "",

        gelecekHaftaPlani: "",

        genelNot: ""

    });

    useEffect(() => {

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

                console.error(error);

            }

        };

        loadProjects();

    }, [rol, kullaniciId]);

    useEffect(() => {

        if (!reportId) return;

        const loadReport = async () => {

            try {

                const data = await getWeeklyReportById(reportId);

                setReport({

                    projectId: data.projectId,

                    haftaNo: data.haftaNo,

                    raporTarihi: data.raporTarihi,

                    tamamlanmaYuzdesi: data.tamamlanmaYuzdesi,

                    buHaftaYapilanlar: data.buHaftaYapilanlar,

                    devamEdenIsler: data.devamEdenIsler,

                    riskler: data.riskler,

                    engeller: data.engeller,

                    gelecekHaftaPlani: data.gelecekHaftaPlani,

                    genelNot: data.genelNot

                });

            } catch (error) {

                console.error(error);

            }

        };

        loadReport();

    }, [reportId]);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setReport((prev) => ({

            ...prev,

            [name]: value

        }));

    };

    const handleSave = async () => {

        try {

            if (reportId) {

                await updateWeeklyReport(reportId, report);

                alert("Haftalık rapor güncellendi.");

            } else {

                await createWeeklyReport(report);

                alert("Haftalık rapor oluşturuldu.");

            }

            navigate("/weekly-reports");

        } catch (error) {

            console.error(error);

            alert("İşlem başarısız.");

        }

    };
        return (

        <div className="weekly-report-page">

             <div className="weekly-header-card">

                <div className="weekly-title">

                    <h2>
                        {reportId
                            ? "Haftalık Rapor Güncelle"
                            : "Yeni Haftalık Rapor"}
                    </h2>

                    <p>
                        {reportId
                            ? "Haftalık rapor bilgilerini güncelleyebilirsiniz."
                            : "Projeye ait haftalık gelişmeleri giriniz."
                        }
                    </p>

                </div>
                </div>

                <div className="weekly-form">

                    <div className="weekly-row">

                        <div className="weekly-group">

                            <label>Proje</label>

                            <Autocomplete
                                options={projects}
                                getOptionLabel={(option) => option.projeAdi}
                                value={
                                    projects.find(
                                        (project) =>
                                            project.id === Number(report.projectId)
                                    ) || null
                                }
                                onChange={(event, newValue) => {

                                    setReport({

                                        ...report,

                                        projectId: newValue
                                            ? newValue.id
                                            : ""

                                    });

                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        placeholder="Proje seçiniz..."
                                    />
                                )}
                            />

                        </div>

                        <div className="weekly-group">

                            <label>Hafta No</label>

                            <input
                                type="number"
                                name="haftaNo"
                                value={report.haftaNo}
                                onChange={handleChange}
                                placeholder="Örn: 25"
                            />

                        </div>

                    </div>

                    <div className="weekly-row">

                        <div className="weekly-group">

                            <label>Rapor Tarihi</label>

                            <input
                                type="date"
                                name="raporTarihi"
                                value={report.raporTarihi}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="weekly-group">

                            <label>Tamamlanma (%)</label>

                            <input
                                type="number"
                                name="tamamlanmaYuzdesi"
                                min="0"
                                max="100"
                                value={report.tamamlanmaYuzdesi}
                                onChange={handleChange}
                            />

                        </div>

                    </div>
                                        <div className="weekly-group">

                        <label>Bu Hafta Yapılanlar</label>

                        <textarea
                            name="buHaftaYapilanlar"
                            value={report.buHaftaYapilanlar}
                            onChange={handleChange}
                            rows={5}
                            placeholder="Bu hafta yapılan işleri yazınız..."
                        />

                    </div>

                    <div className="weekly-group">

                        <label>Devam Eden İşler</label>

                        <textarea
                            name="devamEdenIsler"
                            value={report.devamEdenIsler}
                            onChange={handleChange}
                            rows={5}
                            placeholder="Devam eden işleri yazınız..."
                        />

                    </div>

                    <div className="weekly-row">

                        <div className="weekly-group">

                            <label>Riskler</label>

                            <textarea
                                name="riskler"
                                value={report.riskler}
                                onChange={handleChange}
                                rows={5}
                                placeholder="Riskleri yazınız..."
                            />

                        </div>

                        <div className="weekly-group">

                            <label>Engeller</label>

                            <textarea
                                name="engeller"
                                value={report.engeller}
                                onChange={handleChange}
                                rows={5}
                                placeholder="Engelleri yazınız..."
                            />

                        </div>

                    </div>

                    <div className="weekly-row">

                        <div className="weekly-group">

                            <label>Gelecek Hafta Planı</label>

                            <textarea
                                name="gelecekHaftaPlani"
                                value={report.gelecekHaftaPlani}
                                onChange={handleChange}
                                rows={5}
                                placeholder="Gelecek hafta planını yazınız..."
                            />

                        </div>

                        <div className="weekly-group">

                            <label>Genel Not</label>

                            <textarea
                                name="genelNot"
                                value={report.genelNot}
                                onChange={handleChange}
                                rows={5}
                                placeholder="Varsa ek not..."
                            />

                        </div>

                    </div>

                    <div className="weekly-buttons">

                        <button
                            type="button"
                            className="weekly-cancel-btn"
                            onClick={() => navigate("/weekly-reports")}
                        >
                            İptal
                        </button>

                        <button
                            type="button"
                            className="weekly-save-btn"
                            onClick={handleSave}
                        >
                            {reportId ? "Güncelle" : "Kaydet"}
                        </button>

                    </div>

                </div>

            </div>
            

        
    );

}

export default WeeklyReportForm;