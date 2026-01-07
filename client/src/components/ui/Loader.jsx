import { motion } from "framer-motion";

/**
 * Componente Loader animado.
 *
 * Muestra un spinner circular utilizando SVG y Framer Motion.
 * Se usa para indicar un estado de carga.
 *
 * @component
 * @param {Object} props - Props del componente
 * @param {number} [props.size=56] - Tamaño del loader en píxeles (ancho y alto)
 * @returns {JSX.Element} Componente Loader animado
 */
export const Loader = ({ size = 56 }) => {
    return (
        <div className="loader-container">
            <motion.svg
                width={size}
                height={size}
                viewBox="0 0 50 50"
                animate={{ rotate: 360 }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 1,
                }}
            >
                <circle
                    cx="25"
                    cy="25"
                    r="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeDasharray="90 150"
                />
            </motion.svg>
        </div>
    );
};
