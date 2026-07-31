import { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { FaChartLine, FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [kullaniciAdi, setKullaniciAdi] = useState("");
    const [sifre, setSifre] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();
    const handleLogin = async () => {
  console.log("Login butonuna basıldı");
  try {
    const response = await fetch("http://localhost:8086/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
     body: JSON.stringify({
  kullaniciAdi,
  sifre,
}),
    });

    const data = await response.json();

    if (response.ok) {

 login(data);

  alert("Giriş başarılı.");

  navigate("/dashboard");

} else {

  alert("Kullanıcı adı veya şifre hatalı.");

}
  }catch (error) {
  console.error("Hata:", error);
  alert("Sunucuya bağlanılamadı.");
}
};
  return (
    <div className="login-container">

      <div className="login-card">

        {/* Üst bölüm */}
        <div className="login-header">

          {/* Logo */}
          <FaChartLine className="logo-icon" />

          {/* Başlık */}
          <h1>CTO PROJE TAKİP SİSTEMİ</h1>

          {/* Alt başlık */}
          <p>Haftalık Proje Yönetim Platformu</p>

        </div>
        <hr className="divider" />
        <div className="login-form">
  <label>Kullanıcı Adı</label>

<input
  type="text"
  name="kullaniciAdi"
  placeholder="Kullanıcı adınızı giriniz"
  value={kullaniciAdi}
  onChange={(e) => setKullaniciAdi(e.target.value)}
  autoComplete="off"
/>
  <label>Şifre</label>

  <div className="password-input">

  <input
  type={showPassword ? "text" : "password"}
  name="sifre"
  placeholder="Şifrenizi giriniz"
  value={sifre}
  onChange={(e) => setSifre(e.target.value)}
  autoComplete="off"
/>

  <button
    type="button"
    className="eye-button"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? <FaEyeSlash /> : <FaEye />}
  </button>

</div>

  <button
  className="login-button"
  onClick={handleLogin}
>
  Giriş Yap
</button>
  
</div>

      </div>

    </div>
    
  );
}

export default Login;