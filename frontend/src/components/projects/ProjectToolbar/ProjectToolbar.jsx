import "./ProjectToolbar.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { FaSearch, FaPlus, FaSyncAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getProjectManagers } from "../../../services/userService";

function ProjectToolbar({
    durumFiltresi,
    setDurumFiltresi,

    oncelikFiltresi,
    setOncelikFiltresi,

    yoneticiFiltresi,
    setYoneticiFiltresi,

    aramaMetni,
    setAramaMetni
}) {

    const navigate = useNavigate();
    const { rol } = useAuth();
    const [yoneticiler, setYoneticiler] = useState([]);
    useEffect(() => {

    const loadManagers = async () => {

        try {

            const data = await getProjectManagers();

            setYoneticiler(data);

        } catch (error) {

            console.error(error);

        }

    };

    loadManagers();

}, []);
    const handleNewProjectClick = () => {
        navigate("/projects/new");
    };

    const temizleFiltreler = () => {

        setAramaMetni("");
        setDurumFiltresi("");
        setOncelikFiltresi("");
        setYoneticiFiltresi("");

    };

    return (

        <div className="project-toolbar">

        

            <div className="toolbar-search">

                <FaSearch className="search-icon"/>

                <input
                    type="text"
                    placeholder="Projeleri Ara..."
                    value={aramaMetni}
                    onChange={(e)=>setAramaMetni(e.target.value)}
                />

            </div>

            <div className="toolbar-filters">

                <select
                    value={durumFiltresi}
                    onChange={(e)=>setDurumFiltresi(e.target.value)}
                >
                    <option value="">Tüm Durumlar</option>
                    <option value="PLANLANDI">Planlandı</option>
                    <option value="DEVAM_EDIYOR">Devam Ediyor</option>
                    <option value="TAMAMLANDI">Tamamlandı</option>
                    <option value="RISKLI">Riskli</option>
                    <option value="BEKLEMEDE">Beklemede</option>
                </select>

                <select
                    value={oncelikFiltresi}
                    onChange={(e)=>setOncelikFiltresi(e.target.value)}
                >
                    <option value="">Tüm Öncelikler</option>
                    <option value="DUSUK">Düşük</option>
                    <option value="ORTA">Orta</option>
                    <option value="YUKSEK">Yüksek</option>
                </select>

                {(rol==="ADMIN" || rol==="CTO") && (

    <select
        value={yoneticiFiltresi}
        onChange={(e) => setYoneticiFiltresi(e.target.value)}
    >

        <option value="">
            Tüm Yöneticiler
        </option>

        {yoneticiler.map((yonetici) => (

            <option
                key={yonetici.id}
                value={yonetici.id}
            >
                {yonetici.adSoyad}
            </option>

        ))}

</select>

                )}

                <button
                    className="clear-filter-btn"
                    onClick={temizleFiltreler}
                >
                    <FaSyncAlt />
                    Tüm Filtreleri Kaldır
                </button>

            </div>

        </div>

    );

}

export default ProjectToolbar;