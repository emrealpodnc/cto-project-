import { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { FaChartLine, FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const navigate = useNavigate();
const handleLogin = async () => {
  console.log("Login butonuna basıldı");
  try {
    const response = await fetch("http://localhost:8086/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (response.ok) {

      alert(data.message);

      // Daha sonra kullanıcı bilgilerini burada saklayacağız
      localStorage.setItem("email", email);

      // Dashboard sayfasına yönlendir
      navigate("/dashboard");

    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error(error);
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
  <label>E-posta</label>

 <input
  type="email"
  placeholder="E-posta adresinizi giriniz"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
  <label>Şifre</label>

  <div className="password-input">

  <input
  type={showPassword ? "text" : "password"}
  placeholder="Şifrenizi giriniz"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
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
  <p className="signup-text">
  Hesabın yok mu?
</p>

<button
  className="signup-button"
  type="button"
  onClick={() => {navigate("/signup");
  }}
>
  Kayıt Ol
</button>
</div>

      </div>

    </div>
    
  );
}

export default Login;