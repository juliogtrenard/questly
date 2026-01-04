import { Outlet } from "react-router";
import { AdminSidebar } from "../../../components/admin/AdminSidebar";
import "../admin.css";

/**
 * Componente que define el layout principal del panel de administración.
 * Incluye una barra lateral de navegación y un área de contenido
 * donde se renderizarán las diferentes vistas de administración.
 *
 * @component
 * @returns {JSX.Element} El layout de administración con barra lateral y contenido.
 */
export const AdminLayout = () => {
    return (
        <div className="admin-layout">
            <AdminSidebar />
            <main className="admin-content">
                <Outlet />
            </main>
        </div>
    );
};
