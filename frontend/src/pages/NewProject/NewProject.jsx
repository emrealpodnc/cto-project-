import { useState } from "react";

import "./NewProject.css";

function NewProject() {
    const [proje, setProje] = useState({
    projeAdi: "",
    projeYoneticisi: "",
    baslangicTarihi: "",
    bitisTarihi: "",
    durum: "Devam Ediyor",
    aciklama: ""
});

const handleChange = (e) => {

    const { name, value } = e.target;

    setProje((oncekiProje) => ({
        ...oncekiProje,
        [name]: value
    }));
};
const handleSave = () => {
    console.log(JSON.stringify(proje, null, 2));
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
  <input
    type="text"
    name="projeYoneticisi"
    placeholder="proje yöneticisi adını giriniz"
    value={proje.projeYoneticisi}
    onChange={handleChange}
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
    <option>Devam Ediyor</option>
    <option>Planlandı</option>
    <option>Beklemede</option>
    <option>Tamamlandı</option>
    <option>Riskli</option>
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