import { Link } from "react-router";
import { Book, Menu, X, LogIn, SquarePlus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import "./Header.css";

/**
 * Componente Header.
 *
 * Representa la barra de navegación de las rutas públicas.
 * Incluye:
 * - Logo con animación
 * - Botones de login y registro
 * - Menú responsive para dispositivos móviles
 *
 * @component
 * @returns {JSX.Element} Header de las rutas públicas.
 */
export const Header = () => {
    /** Estado para abrir/cerrar menú móvil */
    const [menuOpen, setMenuOpen] = useState(false);

    /** Estado para detectar si es vista móvil */
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    /**
     * Escucha cambios de tamaño de ventana
     * y ajusta isMobile. También cierra el menú si
     * se pasa a desktop.
     */
    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth <= 768;
            setIsMobile(mobile);
            if (!mobile) setMenuOpen(false); // Cierra menú al pasar a desktop
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <header className="header">
            {/* Logo */}
            <motion.div
                className="logo-container"
                initial={{ x: -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 120 }}
            >
                <Link to="/" className="logo-link">
                    <Book size={28} className="logo-icon" />
                    <span className="font-cinzel">Questly</span>
                </Link>
            </motion.div>

            {/* Header en desktop */}
            {!isMobile && (
                <nav className="nav-buttons">
                    <Link to="/login">
                        <button className="btn">
                            <LogIn className="auth-icons" />
                            <span>Entrar</span>
                        </button>
                    </Link>
                    <Link to="/register">
                        <button className="btn btn-primary">
                            <SquarePlus className="auth-icons" />
                            <span>Registrarse</span>
                        </button>
                    </Link>
                </nav>
            )}

            {/* Icono del menu en movil */}
            {isMobile && (
                <motion.div
                    className="mobile-menu-icon"
                    onClick={() => setMenuOpen(!menuOpen)}
                    animate={{ rotate: menuOpen ? 90 : 0 }}
                    transition={{ type: "spring", stiffness: 200 }}
                >
                    {menuOpen ? (
                        <X size={28} className="auth-icons" />
                    ) : (
                        <Menu size={28} className="auth-icons" />
                    )}
                </motion.div>
            )}

            {/* Menu desplegable movil */}
            <AnimatePresence>
                {menuOpen && isMobile && (
                    <motion.nav
                        className="mobile-menu"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Link
                            to="/login"
                            onClick={() => setMenuOpen(false)}
                            className="mobile-link"
                        >
                            Entrar
                        </Link>
                        <Link
                            to="/register"
                            onClick={() => setMenuOpen(false)}
                            className="mobile-link"
                        >
                            Registrarse
                        </Link>
                    </motion.nav>
                )}
            </AnimatePresence>
        </header>
    );
};
