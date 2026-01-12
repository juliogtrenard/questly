import { Navigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { Loader } from "../ui/Loader";

/**
 * Componente de ruta protegida.
 *
 * Restringe el acceso a una ruta según:
 * - Si el usuario está autenticado
 * - Si el usuario tiene el rol requerido
 *
 * Si el usuario no está autenticado, redirige a la página principal.
 * Si el usuario no tiene el rol adecuado, redirige a su dashboard correspondiente.
 *
 * @component
 * @param {Object} props - Props del componente
 * @param {React.ReactNode} props.children - Componentes hijos que se renderizan si el acceso es válido
 * @param {string} [props.role] - Rol requerido para acceder a la ruta
 *
 * @returns {JSX.Element} Componente protegido o una redirección
 */
export const ProtectedRoute = ({ children, role }) => {
    /**
     * Estado de autenticación obtenido del contexto.
     *
     * @type {{
     *  user: { role: string } | null,
     *  loading: boolean
     * }}
     */
    const { user, loading } = useAuth();

    if (loading) return <Loader />;

    if (!user) return <Navigate to="/" replace />;

    if (role && user.role !== role)
        return (
            <Navigate
                to={user.role === "admin" ? "/admin" : "/dashboard"}
                replace
            />
        );

    return children;
};
