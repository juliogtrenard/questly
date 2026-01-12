import { Pencil, Trash2, ArrowRight } from "lucide-react";
import "../ui/DataCard.css";

/**
 * Componente EventCard
 *
 * Tarjeta que representa un evento con acciones de edición
 * y eliminación.
 *
 * @component
 *
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.data - Datos del evento
 * @param {string} props.data.title - Título del evento
 * @param {string} props.data.text - Texto narrativo del evento
 * @param {Array<Object>} [props.data.options] - Opciones del evento
 * @param {Function} props.onEdit - Editar el evento
 * @param {Function} props.onDelete - Eliminar el evento
 *
 * @returns {JSX.Element} Tarjeta visual del evento
 */
export const EventCard = ({ data, onEdit, onDelete }) => {
    /**
     * Desestructuración de los datos del evento con un valor por defecto
     * cuando no existen opciones.
     */
    const { title, text, options = [] } = data;

    return (
        <div className="bento-card">
            <div className="card-actions">
                <button onClick={() => onEdit(data)}>
                    <Pencil size={16} />
                </button>
                <button onClick={() => onDelete(data)}>
                    <Trash2 size={16} />
                </button>
            </div>

            <h3>{title}</h3>

            <p className="bento-description">
                {text.length > 160 ? text.slice(0, 160) + "..." : text}
            </p>

            {options.length > 0 && (
                <div className="event-options">
                    {options.map((opt, index) => (
                        <div key={index} className="event-option">
                            <ArrowRight size={14} />
                            <span>{opt.text}</span>
                            {opt.requirements?.stat && (
                                <small>
                                    {" "}
                                    (Requiere {opt.requirements.stat} ≥{" "}
                                    {opt.requirements.minValue})
                                </small>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
