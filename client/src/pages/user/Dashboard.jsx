import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) navigate("/login");
    }, [user]);

    return (
        <div style={{ padding: "2rem" }}>
            <h2>Dashboard de Usuario</h2>
            <p>Bienvenido, {user?.username || user?.email}</p>
            <p>Tu rol: {user?.role}</p>
            <button onClick={logout}>Cerrar sesión</button>
        </div>
    );
};
