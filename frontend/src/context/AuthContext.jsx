import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [token, setToken] = useState(localStorage.getItem("token"));
    const [rol, setRol] = useState(localStorage.getItem("rol"));
    const [kullaniciAdi, setKullaniciAdi] = useState(localStorage.getItem("kullaniciAdi"));
    const [kullaniciId, setKullaniciId] = useState(localStorage.getItem("kullaniciId"));
    
    const login = (data) => {

        localStorage.setItem("token", data.token);
        localStorage.setItem("rol", data.rol);
        localStorage.setItem("kullaniciAdi", data.kullaniciAdi);
        localStorage.setItem("kullaniciId", data.kullaniciId);

        setToken(data.token);
        setRol(data.rol);
        setKullaniciAdi(data.kullaniciAdi);
        setKullaniciId(data.kullaniciId);
    };

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("rol");
        localStorage.removeItem("kullaniciAdi");
        localStorage.removeItem("kullaniciId");
        setToken(null);
        setRol(null);
        setKullaniciAdi(null);
        setKullaniciId(null);
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                rol,
                kullaniciAdi,
                kullaniciId,
                login,
                logout

            }}
        >
            {children}
        </AuthContext.Provider>
    );

}

export function useAuth() {
    return useContext(AuthContext);
}