import { NavLink } from "react-router";
import { LayoutDashboard, Sword, LogOut, User } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

/**
 * Componente UserSidebar
 *
 * Sidebar de navegación para el panel de usuario.
 * Muestra información del usuario, enlaces de navegación
 * y un botón para cerrar sesión.
 *
 * @component
 * @returns {JSX.Element} Sidebar de usuario
 */
export const UserSidebar = () => {
    /**
     * Obtiene el usuario autenticado y la función de cierre de sesión
     * desde el contexto de autenticación.
     *
     * @type {{ user: Object, logout: Function }}
     */
    const { user, logout } = useAuth();

    /**
     * Maneja el cierre de sesión del administrador.
     * Llama a la función logout.
     *
     * @async
     * @function handleLogout
     * @returns {Promise<void>}
     */
    const handleLogout = async () => {
        await logout();
    };

    return (
        <aside className="user-sidebar">
            <div className="user-top">
                <div className="user-user">
                    <div className="user-username">
                        <User />
                        <div className="data">
                            <span>{user?.username}</span>
                            <span className="user-role">Usuario</span>
                        </div>
                    </div>
                </div>

                <nav className="user-nav">
                    <NavLink to="/dashboard" end>
                        <LayoutDashboard size={18} />
                        Dashboard
                    </NavLink>

                    <NavLink to="/dashboard/characters">
                        <Sword size={18} />
                        Personajes
                    </NavLink>
                </nav>
            </div>

            <div className="user-bottom">
                <button className="logout-btn" onClick={handleLogout}>
                    <LogOut size={18} />
                    Cerrar sesión
                </button>
            </div>
        </aside>
    );
};
