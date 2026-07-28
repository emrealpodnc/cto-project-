import { useState } from "react";
import { createProject } from "../../services/projectService";
import "./NewProject.css";

function NewProject() {
    const [proje, setProje] = useState({
    projeAdi: "",
    projeYoneticisiId: 1,
    baslangicTarihi: "",
    bitisTarihi: "",
    durum: "DEVAM_EDIYOR",
    oncelik: "ORTA",
    aciklama: "",
    tamamlanmaYuzdesi: 0
});

const handleChange = (e) => {

    const { name, value } = e.target;

    setProje((oncekiProje) => ({
        ...oncekiProje,
        [name]: value
    }));
};
const handleSave = async () => {
    try {
        const sonuc = await createProject(proje);

        console.log("Kayıt başarılı:", sonuc);

        alert("Proje başarıyla oluşturuldu!");

    } catch (error) {
        console.error(error);

        alert("Proje oluşturulamadı!");
    }
};
  return (
    <div className="new-project-page">

      <h1>Yeni Proje</h1>
      <p className="page-description">
    Yeni bir proje oluşturmak için aşağıdaki bilgileri doldurun.
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
  <select
    name="projeYoneticisiId"
    value={proje.projeYoneticisiId}
    onChange={handleChange}
>
    <option value={1}>Ayşenur Hanım</option>
</select>
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

          <button className="cancel-btn">
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