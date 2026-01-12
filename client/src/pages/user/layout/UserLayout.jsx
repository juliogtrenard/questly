import { Outlet } from "react-router";
import { UserSidebar } from "../../../components/user/UserSidebar";
import "../user.css";

/**
 * Componente que define el layout principal del panel de usuario.
 * Incluye una barra lateral de navegación y un área de contenido
 * donde se renderizarán las diferentes vistas de usuario.
 *
 * @component
 * @returns {JSX.Element} El layout de usuario con barra lateral y contenido.
 */
export const UserLayout = () => {
    return (
        <div className="user-layout">
            <UserSidebar />
            <main className="user-content">
                <Outlet />
            </main>
        </div>
    );
};
