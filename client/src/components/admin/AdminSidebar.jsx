import { NavLink } from "react-router";
import {
    LayoutDashboard,
    Sword,
    ScrollText,
    LogOut,
    ShieldUser,
    UserCog,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

/**
 * Componente AdminSidebar
 *
 * Sidebar de navegación para el panel de administración.
 * Muestra información del usuario administrador, enlaces de navegación
 * y un botón para cerrar sesión.
 *
 * @component
 * @returns {JSX.Element} Sidebar de administración
 */
export const AdminSidebar = () => {
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
        <aside className="admin-sidebar">
            <div className="admin-top">
                <div className="admin-user">
                    <div className="admin-username">
                        <ShieldUser />
                        <div className="data">
                            <span>{user?.username}</span>
                            <span className="admin-role">Administrador</span>
                        </div>
                    </div>
                </div>

                <nav className="admin-nav">
                    <NavLink to="/admin" end>
                        <LayoutDashboard size={18} />
                        Dashboard
                    </NavLink>

                    <NavLink to="/admin/class">
                        <Sword size={18} />
                        Clases
                    </NavLink>

                    <NavLink to="/admin/event">
                        <ScrollText size={18} />
                        Eventos
                    </NavLink>

                    <NavLink to="/admin/users">
                        <UserCog size={18} />
                        Usuarios
                    </NavLink>
                </nav>
            </div>

            <div className="admin-bottom">
                <button className="logout-btn" onClick={handleLogout}>
                    <LogOut size={18} />
                    Cerrar sesión
                </button>
            </div>
        </aside>
    );
};
