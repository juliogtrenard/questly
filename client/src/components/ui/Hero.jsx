import { motion } from "framer-motion";
import { Sword, Trophy } from "lucide-react";
import { Link } from "react-router";
import "./Hero.css";

/**
 * Componente Hero.
 *
 * Sección principal de la página.
 * Incluye:
 * - Texto de bienvenida y título animado
 * - Descripción de la aplicación
 * - Botones de acción (comenzar aventura / leaderboard)
 * - Decoraciones flotantes animadas
 *
 * @component
 * @returns {JSX.Element} Hero section de la página
 */
export const Hero = () => {
    return (
        <section className="section">
            <div className="background-gradient"></div>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="motion-content"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="cta"
                    >
                        <span className="cta-text">Tu aventura te espera</span>
                    </motion.div>

                    <h1 className="title">
                        Enfrenta tu destino en
                        <br />
                        <span className="highlighted-text">Questly</span>
                    </h1>

                    <p className="description">
                        Embárcate en aventuras narrativas interactivas donde
                        cada decisión moldea tu historia. Crea personajes
                        únicos, enfrenta desafíos épicos y compite por la
                        gloria.
                    </p>

                    <div className="button-container">
                        <Link to="/login" className="btn primary">
                            <Sword className="btn-icon primary" />
                            Comenzar aventura
                        </Link>
                        <Link to="/leaderboard" className="btn outline">
                            <Trophy className="btn-icon" />
                            Ver puntuaciones
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Floating decorations */}
            <motion.div
                animate={{ y: [0, -50, 0] }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="floating-icon left"
            >
                ⚔️
            </motion.div>
            <motion.div
                animate={{ y: [0, 50, 0] }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="floating-icon right"
            >
                🛡️
            </motion.div>
        </section>
    );
};
