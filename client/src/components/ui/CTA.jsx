import { Book } from "lucide-react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import "./CTA.css";

/**
 * Componente CTA.
 *
 * Representa la sección de llamada a la acción de la landing page.
 * Incluye:
 * - Icono
 * - Título
 * - Descripción
 * - Botón de registro
 *
 * @component
 * @returns {JSX.Element} Sección CTA de la página
 */
export const CTA = () => {
    return (
        <section className="cta-section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="cta-content"
                >
                    <div className="cta-background" />
                    <div className="cta-inner">
                        <Book className="cta-icon" />
                        <h2 className="cta-title">Tu historia comienza aquí</h2>
                        <p className="cta-description">
                            Miles de aventureros ya han comenzado su viaje.
                            ¿Estás listo para unirte a ellos y escribir tu
                            propia leyenda?
                        </p>
                        <Link to="/register">
                            <span className="cta-button-text">
                                Crear cuenta
                            </span>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
