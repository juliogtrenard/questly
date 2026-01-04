import {
    Pencil,
    Trash2,
    Heart,
    Swords,
    ShieldHalf,
    Brain,
    Footprints,
    Eye,
} from "lucide-react";
import "./ClassCard.css";

/**
 * Componente ClassCard
 *
 * Tarjeta que representa una clase con acciones de edición
 * y eliminación.
 *
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.data - Datos de la clase
 * @param {string} props.data.name - Nombre de la clase
 * @param {string} props.data.description - Descripción de la clase
 * @param {Object} props.data.stats - Estadísticas de la clase
 * @param {number} props.data.stats.vitality - Vida
 * @param {number} props.data.stats.attack - Ataque
 * @param {number} props.data.stats.defense - Defensa
 * @param {number} props.data.stats.intelligence - Inteligencia
 * @param {number} props.data.stats.dexterity - Destreza
 * @param {number} props.data.stats.perception - Percepción
 * @param {Function} props.onEdit - Editar la clase
 * @param {Function} props.onDelete - Eliminar la clase
 * @returns {JSX.Element} Tarjeta de clase
 */
export const ClassCard = ({ data, onEdit, onDelete }) => {
    /**
     * Desestructuración de los datos principales de la clase
     *
     * @type {{ name: string, description: string, stats: Object }}
     */
    const { name, description, stats } = data;

    return (
        <div className="bento-card">
            <div className="card-actions">
                <button type="button" onClick={() => onEdit(data)}>
                    <Pencil size={16} />
                </button>
                <button type="button" onClick={() => onDelete(data)}>
                    <Trash2 size={16} />
                </button>
            </div>

            <h3>{name}</h3>
            <p className="bento-description">{description}</p>

            <div className="bento-stats">
                <span>
                    <Heart /> {stats.vitality}
                </span>
                <span>
                    <Swords /> {stats.attack}
                </span>
                <span>
                    <ShieldHalf /> {stats.defense}
                </span>
                <span>
                    <Brain /> {stats.intelligence}
                </span>
                <span>
                    <Footprints /> {stats.dexterity}
                </span>
                <span>
                    <Eye /> {stats.perception}
                </span>
            </div>
        </div>
    );
};
