import "./Header.css";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useLocation } from "react-router-dom";
function Header() {

    const { kullaniciAdi, rol, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

let pageTitle = "";
let pageDescription = "";

const pages = {
    "/dashboard": {
        title: "Ana Sayfa",
        description: "Genel proje durumunu buradan takip edebilirsiniz."
    },
    "/projects": {
        title: "Projeler",
        description: "Projeleri görüntüleyin, filtreleyin ve yönetin."
    },
    "/weekly-reports": {
        title: "Haftalık Raporlar",
        description: "Haftalık raporları görüntüleyin ve yönetin."
    },
    "/users": {
        title: "Kullanıcılar",
        description: "Kullanıcıları yönetin."
    },
};

const currentPage =
    Object.entries(pages).find(([path]) =>
        location.pathname.startsWith(path)
    )?.[1] || {
        title: "CTO Proje Takip Sistemi",
        description: ""
    };
    return (

        <header className="header">

            <div className="header-left">

                <h1>{currentPage.title}</h1>

<p>{currentPage.description}</p>
                <h1>{pageTitle}</h1>

                <p>
                    {pageDescription}
                </p>

            </div>

          <div className="user-info">

    <div className="user-card">

        <FaUserCircle className="user-icon" />

        <div>

            <span className="username">
                {kullaniciAdi}
            </span>

        </div>

    </div>

</div>

        </header>

    );

}

export default Header;
