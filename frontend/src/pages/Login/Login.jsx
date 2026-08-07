import { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
    FaChartLine,
    FaEye,
    FaEyeSlash,
    FaUser,
    FaLock
} from "react-icons/fa";
function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [kullaniciAdi, setKullaniciAdi] = useState("");
    const [sifre, setSifre] = useState("");
    const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();
  const handleLogin = async () => {

    setLoading(true);
    setError("");

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

        if (!response.ok) {

            setError("Kullanıcı adı veya şifre hatalı.");
            return;

        }

        const data = await response.json();

        login(data);

        navigate("/dashboard");

    } catch (error) {

        console.error(error);
        setError("Sunucuya bağlanılamadı.");

    } finally {

        setLoading(false);

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

<div className="input-group">

    <FaUser className="input-icon"/>

    <input
        type="text"
        placeholder="Kullanıcı adınızı giriniz"
        value={kullaniciAdi}
        onChange={(e)=>setKullaniciAdi(e.target.value)}
        onKeyDown={(e)=>e.key==="Enter" && handleLogin()}
    />

</div>
  <label>Şifre</label>
<div className="password-input">

    <FaLock className="input-icon"/>

    <input
        type={showPassword ? "text" : "password"}
        placeholder="Şifrenizi giriniz"
        value={sifre}
        onChange={(e)=>setSifre(e.target.value)}
        onKeyDown={(e)=>e.key==="Enter" && handleLogin()}
    />

    <button
        type="button"
        className="eye-button"
        onClick={()=>setShowPassword(!showPassword)}
    >
        {showPassword ? <FaEyeSlash/> : <FaEye/>}
    </button>

</div>

{
error &&
<div className="error-message">
    {error}
</div>
}

 <div style={{ marginTop: 10, textAlign: "right" }}>
  </div>

 <button
    className="login-button"
    onClick={handleLogin}
    disabled={loading}
>
    {
        loading
        ? "Giriş Yapılıyor..."
        : "Giriş Yap"
    }
</button>
  
</div>

      </div>

    </div>
    
  );
}

export default Login;