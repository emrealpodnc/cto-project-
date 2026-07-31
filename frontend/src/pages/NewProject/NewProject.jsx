import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    createProject,
    getProjectById,
    updateProject
} from "../../services/projectService";
import "./NewProject.css";
import { getUsers } from "../../services/userService";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
const ColoredSlider = styled(Slider)(({ value }) => ({

  color:
    value <= 30
      ? "#e53935"
      : value <= 70
      ? "#fb8c00"
      : "#43a047",

}));
function NewProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [proje, setProje] = useState({ 
    projeAdi: "",
    projeYoneticisiId: "",
    baslangicTarihi: "",
    bitisTarihi: "",
    durum: "DEVAM_EDIYOR",
    oncelik: "ORTA",
    aciklama: "",
    tamamlanmaYuzdesi: 0
});
const [users, setUsers] = useState([]);
const handleChange = (e) => {

    const { name, value } = e.target;

    setProje((oncekiProje) => ({
        ...oncekiProje,
        [name]: value
    }));
};

useEffect(() => {

    if (!id) return;

    const loadProject = async () => {
        try {

            const data = await getProjectById(id);

           setProje({
                projeAdi: data.projeAdi,
                projeYoneticisiId: data.projeYoneticisiId,
                baslangicTarihi: data.baslangicTarihi || "",
                bitisTarihi: data.bitisTarihi || "",
                durum: data.durum,
                oncelik: data.oncelik,
                aciklama: data.aciklama || "",
                tamamlanmaYuzdesi: data.tamamlanmaYuzdesi || 0
            });

        } catch (error) {
            console.error(error);
        }
    };

    loadProject();

}, [id]);

useEffect(() => {
    const loadUsers = async () => {
        try {
            const data = await getUsers();
            setUsers(data);
        } catch (error) {
            console.error("Kullanıcılar yüklenemedi:", error);
        }
    };

    loadUsers();
}, []);

const handleSave = async () => {

    try {

        if (id) {

            const sonuc = await updateProject(id, proje);

            console.log("Güncelleme başarılı:", sonuc);

            alert("Proje başarıyla güncellendi!");
            navigate("/projects");

        } else {

            const sonuc = await createProject(proje);

            console.log("Kayıt başarılı:", sonuc);

            alert("Proje başarıyla oluşturuldu!");
            navigate("/projects");
        }

    } catch (error) {

        console.error(error);

        alert("İşlem başarısız!");
    }
};;
  return (
    <div className="new-project-page">

      <h1>{id ? "Projeyi Düzenle" : "Yeni Proje"}</h1>

<p className="page-description">
  {id
    ? "Proje bilgilerini güncelleyebilirsiniz."
    : "Yeni bir proje oluşturmak için aşağıdaki bilgileri doldurun."}
</p>
      <div className="project-form">

        <div className="form-group">
          <label>Proje Adı</label>
        <input
    type="text"
    name="projeAdi"
    placeholder="proje adını giriniz"
    value={proje.projeAdi}
    onChange={handleChange}
/>
        </div>

        <div className="form-group">
          <label>Proje Yöneticisi</label>
  <Autocomplete
    options={users}
    getOptionLabel={(option) => option.adSoyad}
    value={
        users.find((user) => user.id === Number(proje.projeYoneticisiId)) || null
    }
    onChange={(event, newValue) => {
        setProje({
            ...proje,
            projeYoneticisiId: newValue ? newValue.id : ""
        });
    }}
    renderInput={(params) => (
        <TextField
            {...params}
            label="Proje Yöneticisi"
            placeholder="Yazarak arayın..."
        />
    )}
/>
        </div>

    <div className="date-row">

  <div className="form-group">
    <label>Başlangıç Tarihi</label>
    <input
    type="date"
    name="baslangicTarihi"
    value={proje.baslangicTarihi}
    onChange={handleChange}
/>
  </div>

  <div className="form-group">
    <label>Bitiş Tarihi</label>
    <input
    type="date"
    name="bitisTarihi"
    value={proje.bitisTarihi}
    onChange={handleChange}
/>
  </div>

</div>

        

        <div className="form-group">
    <label>Durum</label>

    <select
        name="durum"
        value={proje.durum}
        onChange={handleChange}
    >
        <option value="PLANLANDI">Planlandı</option>
        <option value="DEVAM_EDIYOR">Devam Ediyor</option>
        <option value="BEKLEMEDE">Beklemede</option>
        <option value="TAMAMLANDI">Tamamlandı</option>
        <option value="RISKLI">Riskli</option>
    </select>
</div>
        <div className="form-group">
  <label>İlerleme Durumu (%{proje.tamamlanmaYuzdesi})</label>

  <ColoredSlider
  value={Number(proje.tamamlanmaYuzdesi)}
  min={0}
  max={100}
  step={5}
  valueLabelDisplay="auto"
  onChange={(event, newValue) => {

    let yeniDurum = proje.durum;

    if (newValue === 0) {
      yeniDurum = "PLANLANDI";
    } else if (newValue === 100) {
      yeniDurum = "TAMAMLANDI";
    } else {
      yeniDurum = "DEVAM_EDIYOR";
    }

    setProje({
      ...proje,
      tamamlanmaYuzdesi: newValue,
      durum: yeniDurum,
    });

  }}
/>
</div>

        <div className="form-group">
          <label>Açıklama</label>

        <textarea
    name="aciklama"
    rows="5"
    placeholder="Proje açıklamasını giriniz"
    value={proje.aciklama}
    onChange={handleChange}
/>


        </div>

        <div className="button-group">

          <button
    className="cancel-btn"
    onClick={() => navigate("/projects")}
>
    İptal
</button>

       <button
    className="save-btn"
    onClick={handleSave}
>
    Kaydet
</button>

        </div>

      </div>

    </div>
  );
}

export default NewProject;