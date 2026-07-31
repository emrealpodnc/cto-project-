import "./Header.css";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
function Header() {

    const { kullaniciAdi, rol } = useAuth();
    const { logout } = useAuth();
    const navigate = useNavigate();
    return (

        <header className="header">

            <div>
                <h2>CTO Proje Takip Sistemi</h2>
            </div>

            <div className="user-info">

    <span>{kullaniciAdi}</span>

    <span>{rol}</span>

    <button
    onClick={() => {
        logout();
        navigate("/");
    }}
>
    Çıkış Yap
</button>

</div>

        </header>

    );

}

export default Header;