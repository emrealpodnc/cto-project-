import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaChartLine, FaEye, FaEyeSlash } from "react-icons/fa";
import "./SignUp.css";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "/api";

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [feedback, setFeedback] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setFeedback({ type: "", message: "" });

    if (form.password !== form.confirmPassword) {
      setFeedback({ type: "error", message: "Şifreler eşleşmiyor." });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          email: form.email.trim(),
          password: form.password,
        }),
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(payload.message ?? "Kayıt oluşturulamadı.");
      }

      setFeedback({
        type: "success",
        message: payload.message ?? "Kayıt başarıyla oluşturuldu.",
      });
      setForm(initialForm);
    } catch (error) {
      setFeedback({
        type: "error",
        message:
          error instanceof Error ? error.message : "Sunucuya bağlanılamadı.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header">
          <FaChartLine className="signup-logo-icon" />
          <h1>CTO PROJE TAKİP SİSTEMİ</h1>
          <p>Haftalık Proje Yönetim Platformu</p>
        </div>

        <hr className="divider" />

        <form className="signup-form" onSubmit={handleRegister}>
          <div className="name-row">
            <div className="name-field">
              <label htmlFor="firstName">Ad</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Adınız"
                value={form.firstName}
                onChange={updateField}
                autoComplete="given-name"
                required
              />
            </div>

            <div className="name-field">
              <label htmlFor="lastName">Soyad</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Soyadınız"
                value={form.lastName}
                onChange={updateField}
                autoComplete="family-name"
                required
              />
            </div>
          </div>

          <label htmlFor="email">E-posta</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="E-posta adresinizi giriniz"
            value={form.email}
            onChange={updateField}
            autoComplete="email"
            required
          />

          <label htmlFor="password">Şifre</label>
          <div className="password-input">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Şifrenizi giriniz"
              value={form.password}
              onChange={updateField}
              autoComplete="new-password"
              minLength="8"
              required
            />
            <button
              type="button"
              className="eye-button"
              aria-label={showPassword ? "Şifreyi gizle" : "Şifreyi göster"}
              onClick={() => setShowPassword((visible) => !visible)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <label htmlFor="confirmPassword">Şifre Tekrar</label>
          <div className="password-input">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Şifrenizi tekrar giriniz"
              value={form.confirmPassword}
              onChange={updateField}
              autoComplete="new-password"
              minLength="8"
              required
            />
            <button
              type="button"
              className="eye-button"
              aria-label={
                showConfirmPassword ? "Şifreyi gizle" : "Şifreyi göster"
              }
              onClick={() => setShowConfirmPassword((visible) => !visible)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {feedback.message && (
            <p className={`form-feedback ${feedback.type}`} role="alert">
              {feedback.message}
            </p>
          )}

          <button className="signup-button" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Kaydediliyor..." : "Kayıt Ol"}
          </button>

          <p className="signup-text">Zaten hesabın var mı?</p>
          <button
            type="button"
            className="signup-login-button"
            onClick={() => navigate("/")}
          >
            Giriş Yap
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
