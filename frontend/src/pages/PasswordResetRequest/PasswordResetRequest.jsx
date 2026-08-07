import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function PasswordResetRequest() {
  const [kullaniciAdi, setKullaniciAdi] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await api.post("/password-reset-requests", {
        kullaniciAdi,
        description,
      });
      setMessage("Talebiniz sistem yöneticisine iletilmiştir.");
      setKullaniciAdi("");
      setDescription("");
      setTimeout(() => navigate("/"), 1200);
    } catch (error) {
      setMessage(error.response?.data?.message || "Talep oluşturulamadı.");
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "40px auto", padding: 24, background: "white", borderRadius: 12 }}>
      <h2>Şifre Sıfırlama Talebi</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <label>Kullanıcı Adı</label>
        <input value={kullaniciAdi} onChange={(e) => setKullaniciAdi(e.target.value)} />

        <label>Açıklama (Opsiyonel)</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} />

        <button onClick={handleSubmit}>Talep Oluştur</button>
      </div>
      {message && <p style={{ marginTop: 16 }}>{message}</p>}
    </div>
  );
}

export default PasswordResetRequest;
