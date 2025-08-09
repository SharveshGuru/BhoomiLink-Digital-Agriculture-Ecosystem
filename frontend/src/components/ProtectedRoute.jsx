import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../AuthContext";

export default function ProtectedRoute() {
    const { isLoggedIn, loading } = useContext(AuthContext);

    if (loading) {
        return <div>Loading...</div>;
    }

    return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
}
