import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, roles }) {

    const token = localStorage.getItem("token");
    const rol = localStorage.getItem("rol");

    if (!token) {
        return <Navigate to="/" replace />;
    }

    if (roles && !roles.includes(rol)) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}

export default ProtectedRoute;