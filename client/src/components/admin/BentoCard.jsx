/**
 * Componente BentoCard
 *
 * Tarjeta para mostrar la información de las clases
 *
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {string} props.title - Título de la tarjeta
 * @param {string|number} props.value - Valor a mostrar
 * @returns {JSX.Element} Tarjeta tipo "bento"
 */
export const BentoCard = ({ title, value }) => {
    return (
        <div className="bento-card">
            <h3>{title}</h3>
            <p className="value">{value}</p>
        </div>
    );
};
