import { motion } from "framer-motion";
import { Swords, Brain, Trophy, ScrollText } from "lucide-react";
import { FeatureCard } from "./FeatureCard";
import "./Features.css";

/**
 * Componente Features.
 *
 * Muestra la sección de características de la aplicación.
 * Cada feature incluye:
 * - Icono
 * - Título
 * - Descripción
 *
 * @component
 * @returns {JSX.Element} Sección de Features
 */
export const Features = () => {
    // Array de features que se mostrarán en la sección
    const features = [
        {
            id: "historias",
            icon: ScrollText,
            title: "Historias inmersivas",
            description:
                "Sumérgete en narrativas épicas llenas de misterio, aventura y decisiones cruciales.",
        },
        {
            id: "crea-heroe",
            icon: Swords,
            title: "Crea tu héroe",
            description:
                "Personaliza tu personaje eligiendo entre distintas clases.",
        },
        {
            id: "decisiones",
            icon: Brain,
            title: "Decisiones que importan",
            description:
                "Cada elección afecta el desarrollo de la historia según tus estadísticas.",
        },
        {
            id: "competir",
            icon: Trophy,
            title: "Compite por la gloria",
            description:
                "Obtén puntuaciones y escala en la tabla de líderes mundial.",
        },
    ];

    return (
        <section className="features-section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <h2 className="features-title">¿Cómo Funciona?</h2>
                    <p className="features-description">
                        Una experiencia de juego narrativo donde tus habilidades
                        y decisiones determinan el resultado
                    </p>
                </motion.div>

                <div className="features-grid">
                    {features.map((feature) => (
                        <FeatureCard
                            key={feature.id}
                            Icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
