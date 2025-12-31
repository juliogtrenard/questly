import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { Landing } from "../pages/public/Landing";
import { Login } from "../pages/public/Login";
import { Register } from "../pages/public/Register";
import { Dashboard } from "../pages/user/Dashboard";
import { AdminDashboard } from "../pages/admin/AdminDashboard";
import { ProtectedRoute } from "../components/routes/ProtectedRoute";

/**
 * Componente AppRoutes.
 *
 * Define todas las rutas de la aplicación usando React Router.
 * Maneja:
 * - Rutas públicas
 * - Rutas protegidas por autenticación
 * - Redirecciones según el rol del usuario
 *
 * @component
 * @returns {JSX.Element} Configuración de rutas de la aplicación
 */
export const AppRoutes = () => {
    /**
     * Usuario autenticado obtenido desde el AuthContext.
     *
     * @type {{ role: string } | null}
     */
    const { user } = useAuth();

    return (
        <BrowserRouter>
            <Routes>
                {/* =====================
                    PÁGINAS PÚBLICAS
                   ===================== */}

                {/* Landing */}
                <Route
                    path="/"
                    element={
                        !user ? (
                            <Landing />
                        ) : (
                            <Navigate
                                to={
                                    user.role === "admin"
                                        ? "/admin"
                                        : "/dashboard"
                                }
                                replace
                            />
                        )
                    }
                />

                {/* Login */}
                <Route
                    path="/login"
                    element={
                        !user ? (
                            <Login />
                        ) : (
                            <Navigate
                                to={
                                    user.role === "admin"
                                        ? "/admin"
                                        : "/dashboard"
                                }
                                replace
                            />
                        )
                    }
                />

                {/* Register */}
                <Route
                    path="/register"
                    element={
                        !user ? (
                            <Register />
                        ) : (
                            <Navigate
                                to={
                                    user.role === "admin"
                                        ? "/admin"
                                        : "/dashboard"
                                }
                                replace
                            />
                        )
                    }
                />

                {/* =====================
                    RUTAS PROTEGIDAS
                   ===================== */}

                {/* Dashboard de usuario */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute role="user">
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                {/* Dashboard de administrador */}
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute role="admin">
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />

                {/* =====================
                    FALLBACK
                   ===================== */}

                {/* Cualquier ruta no existente */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
};
