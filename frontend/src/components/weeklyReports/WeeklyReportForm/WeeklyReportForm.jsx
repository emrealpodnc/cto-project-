import "./WeeklyReportForm.css";
import { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { getProjects } from "../../../services/projectService";
import {
    createWeeklyReport,
    getWeeklyReportById,
    updateWeeklyReport
} from "../../../services/weeklyReportService";
import { useNavigate } from "react-router-dom";
function WeeklyReportForm({ reportId })  {
    const navigate = useNavigate();
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

                const data = await getProjects();

                setProjects(data);

            } catch (error) {

                console.error("Projeler yüklenemedi:", error);

            }

        };

        loadProjects();

    }, []);

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
            alert("Rapor bilgileri yüklenemedi.");

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

            alert("Haftalık rapor başarıyla güncellendi.");

        } else {

            await createWeeklyReport(report);

            alert("Haftalık rapor başarıyla oluşturuldu.");

        }

        navigate("/weekly-reports");

    } catch (error) {

        console.error(error);

        alert("Rapor kaydedilemedi.");

    }

};

    return (

        <div className="weekly-report-form">

            <h2>{reportId ? "Haftalık Rapor Güncelle" : "Haftalık Rapor"}</h2>

            <div className="form-group">

                <label>Proje</label>

                <Autocomplete
                    options={projects}
                    getOptionLabel={(option) => option.projeAdi}
                    value={
                        projects.find(
                            (project) => project.id === Number(report.projectId)
                        ) || null
                    }
                    onChange={(event, newValue) => {

                        setReport({

                            ...report,

                            projectId: newValue ? newValue.id : ""

                        });

                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Proje"
                            placeholder="Proje seçiniz"
                        />
                    )}
                />

            </div>
            <div className="form-group">

    <label>Hafta No</label>

    <input
        type="number"
        name="haftaNo"
        value={report.haftaNo}
        onChange={handleChange}
        placeholder="Örneğin: 30"
    />

</div>
<div className="form-group">

    <label>Rapor Tarihi</label>

    <input
        type="date"
        name="raporTarihi"
        value={report.raporTarihi}
        onChange={handleChange}
    />

</div>
<div className="form-group">

    <label>Tamamlanma Yüzdesi</label>

    <input
        type="number"
        name="tamamlanmaYuzdesi"
        value={report.tamamlanmaYuzdesi}
        onChange={handleChange}
        min="0"
        max="100"
        placeholder="0-100"
    />

</div>
<div className="form-group">

    <label>Bu Hafta Yapılanlar</label>

    <textarea
        name="buHaftaYapilanlar"
        value={report.buHaftaYapilanlar}
        onChange={handleChange}
        rows="4"
        placeholder="Bu hafta tamamlanan işleri yazınız..."
    />

</div>
<div className="form-group">

    <label>Devam Eden İşler</label>

    <textarea
        name="devamEdenIsler"
        value={report.devamEdenIsler}
        onChange={handleChange}
        rows="4"
        placeholder="Devam eden işleri yazınız..."
    />

</div>
<div className="form-group">

    <label>Riskler</label>

    <textarea
        name="riskler"
        value={report.riskler}
        onChange={handleChange}
        rows="4"
        placeholder="Projedeki riskleri yazınız..."
    />

</div>
<div className="form-group">

    <label>Engeller</label>

    <textarea
        name="engeller"
        value={report.engeller}
        onChange={handleChange}
        rows="4"
        placeholder="Karşılaşılan engelleri yazınız..."
    />

</div>
<div className="form-group">

    <label>Gelecek Hafta Planı</label>

    <textarea
        name="gelecekHaftaPlani"
        value={report.gelecekHaftaPlani}
        onChange={handleChange}
        rows="4"
        placeholder="Gelecek hafta yapılacak işleri yazınız..."
    />

</div>
<div className="form-group">

    <label>Genel Not</label>

    <textarea
        name="genelNot"
        value={report.genelNot}
        onChange={handleChange}
        rows="4"
        placeholder="Varsa eklemek istediğiniz not..."
    />

</div>
<div className="button-group">

    <button
    className="save-btn"
    onClick={handleSave}
>
    {reportId ? "Güncelle" : "Kaydet"}
</button>

</div>
        </div>

    );
}

export default WeeklyReportForm;