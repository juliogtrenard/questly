import { motion } from "framer-motion";
import "./FeatureCard.css";

/**
 * Componente FeatureCard.
 *
 * Representa una card individual de feature.
 *
 * @param {Object} props
 * @param {React.Component} props.Icon - Icono a mostrar
 * @param {string} props.title - Título de la feature
 * @param {string} props.description - Descripción de la feature
 * @returns {JSX.Element} Card de feature
 */
export const FeatureCard = ({ Icon, title, description }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="feature-item"
        >
            <article className="card">
                <div className="card-content">
                    <div className="icon-container">
                        <Icon className="icon" />
                    </div>
                    <h3 className="feature-title">{title}</h3>
                    <p className="feature-description">{description}</p>
                </div>
            </article>
        </motion.div>
    );
};
