import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import api from "../../services/api";

function Users() {
  const [users, setUsers] = useState([]);

  const [modalAcik, setModalAcik] = useState(false);
  const [duzenlemeModu, setDuzenlemeModu] = useState(false);
  const [duzenlenenKullaniciId, setDuzenlenenKullaniciId] = useState(null);

  const [adSoyad, setAdSoyad] = useState("");
  const [kullaniciAdi, setKullaniciAdi] = useState("");
  const [sifre, setSifre] = useState("");
  const [rol, setRol] = useState("");
  const [aktifMi, setAktifMi] = useState(true);

  const kullanicilariGetir = async () => {
    try {
      const response = await api.get("/users");
      setUsers(response.data);
    } catch (error) {
      console.error(error);
      alert("Kullanıcı listesi getirilemedi.");
    }
  };

  useEffect(() => {
    api
      .get("/users")
      .then((response) => setUsers(response.data))
      .catch((error) => {
        console.error(error);
        alert("Kullanıcı listesi getirilemedi.");
      });
  }, []);

  const modalAc = () => {
    setDuzenlemeModu(false);
    setDuzenlenenKullaniciId(null);
    setAdSoyad("");
    setKullaniciAdi("");
    setSifre("");
    setRol("");
    setAktifMi(true);
    setModalAcik(true);
  };

  const modalKapat = () => {
    setModalAcik(false);
    setDuzenlemeModu(false);
    setDuzenlenenKullaniciId(null);
    setAdSoyad("");
    setKullaniciAdi("");
    setSifre("");
    setRol("");
    setAktifMi(true);
  };

  const kullaniciDuzenle = (user) => {
    setDuzenlemeModu(true);
    setDuzenlenenKullaniciId(user.id);
    setAdSoyad(user.adSoyad);
    setKullaniciAdi(user.kullaniciAdi);
    setSifre("");
    setRol(user.rol);
    setAktifMi(user.aktifMi);
    setModalAcik(true);
  };

  const kullaniciKaydet = async () => {
    try {
      if (duzenlemeModu) {
        const guncellemeVerisi = {
          adSoyad,
          kullaniciAdi,
          rol,
          aktifMi,
        };

        // Şifre boşsa backend mevcut şifreyi korur.
        if (sifre.trim() !== "") {
          guncellemeVerisi.sifre = sifre;
        }

        await api.put("/users/" + duzenlenenKullaniciId, guncellemeVerisi);
        alert("Kullanıcı başarıyla güncellendi.");
      } else {
        await api.post("/users", {
          adSoyad,
          kullaniciAdi,
          sifre,
          rol,
          aktifMi,
        });

        alert("Kullanıcı başarıyla oluşturuldu.");
      }

      modalKapat();
      await kullanicilariGetir();
    } catch (error) {
      console.error(error);
      alert(
        duzenlemeModu
          ? "Kullanıcı güncellenemedi."
          : "Kullanıcı oluşturulamadı.",
      );
    }
  };

  return (
    <Layout>
      <h2>Kullanıcı Yönetimi</h2>

      <div style={{ margin: "20px 0" }}>
        <button onClick={modalAc} type="button">
          Yeni Kullanıcı
        </button>
      </div>

      <table
        border="1"
        cellPadding="10"
        style={{ width: "100%", marginTop: "20px" }}
      >
        <thead>
          <tr>
            <th>Ad Soyad</th>
            <th>Kullanıcı Adı</th>
            <th>Rol</th>
            <th>Durum</th>
            <th>İşlem</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.adSoyad}</td>
              <td>{user.kullaniciAdi}</td>
              <td>{user.rol}</td>
              <td>{user.aktifMi ? "Aktif" : "Pasif"}</td>
              <td>
                <button
    style={{ marginRight: "8px" }}
    onClick={() => kullaniciDuzenle(user)}
>
    Düzenle
</button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalAcik && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "10px",
              minWidth: "400px",
            }}
          >
            <h3>
              {duzenlemeModu ? "Kullanıcı Düzenle" : "Yeni Kullanıcı"}
            </h3>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "15px",
              }}
            >
              <input
                type="text"
                placeholder="Ad Soyad"
                value={adSoyad}
                onChange={(e) => setAdSoyad(e.target.value)}
              />

              <input
                type="text"
                placeholder="Kullanıcı Adı"
                value={kullaniciAdi}
                onChange={(e) => setKullaniciAdi(e.target.value)}
              />

              <input
                type="password"
                placeholder={
                  duzenlemeModu
                    ? "Şifre (değiştirmek için doldurun)"
                    : "Şifre"
                }
                required={!duzenlemeModu}
                value={sifre}
                onChange={(e) => setSifre(e.target.value)}
              />

              <select value={rol} onChange={(e) => setRol(e.target.value)}>
                <option value="">Rol Seçiniz</option>
                <option value="ADMIN">ADMIN</option>
                <option value="CTO">CTO</option>
                <option value="PROJECT_MANAGER">PROJECT_MANAGER</option>
              </select>

              {duzenlemeModu && (
                <select
                  value={aktifMi ? "true" : "false"}
                  onChange={(e) => setAktifMi(e.target.value === "true")}
                >
                  <option value="true">Aktif</option>
                  <option value="false">Pasif</option>
                </select>
              )}

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "10px",
                }}
              >
                <button onClick={modalKapat} type="button">
                  İptal
                </button>

                <button onClick={kullaniciKaydet} type="button">
                  Kaydet
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Users;
