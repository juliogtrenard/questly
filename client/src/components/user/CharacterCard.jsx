import { useNavigate } from "react-router";
import {
    Pencil,
    Trash2,
    Heart,
    Swords,
    ShieldHalf,
    Brain,
    Footprints,
    Eye,
    Play,
} from "lucide-react";
import "../ui/DataCard.css";

/**
 * Tarjeta de un personaje con su nombre, clase y estadísticas.
 * Incluye botones para editar y eliminar el personaje.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.data - Los datos del personaje, que incluyen el nombre, la clase y las estadísticas.
 * @param {string} props.data.name - El nombre del personaje.
 * @param {string} props.data.className - La clase del personaje.
 * @param {Object} [props.data.stats] - Las estadísticas del personaje.
 * @param {number} [props.data.stats.vitality=0] - La vitalidad del personaje.
 * @param {number} [props.data.stats.attack=0] - El ataque del personaje.
 * @param {number} [props.data.stats.defense=0] - La defensa del personaje.
 * @param {number} [props.data.stats.intelligence=0] - La inteligencia del personaje.
 * @param {number} [props.data.stats.dexterity=0] - La destreza del personaje.
 * @param {number} [props.data.stats.perception=0] - La percepción del personaje.
 * @param {Function} props.onEdit - Función que se ejecuta cuando se presiona el botón de editar.
 * @param {Function} props.onDelete - Función que se ejecuta cuando se presiona el botón de eliminar.
 *
 * @returns {JSX.Element} Un componente de tarjeta de personaje con botones de eliminar/editar.
 */
export const CharacterCard = ({ data, onEdit, onDelete }) => {
    const navigate = useNavigate();
    const { name, className, stats = {} } = data;

    const {
        vitality = 0,
        attack = 0,
        defense = 0,
        intelligence = 0,
        dexterity = 0,
        perception = 0,
    } = stats;

    const handlePlay = () => {
        navigate("/dashboard/play", {
            state: {
                character: {
                    id: data.id,
                    name,
                    stats,
                },
            },
        });
    };

    return (
        <div className="bento-card">
            <div className="card-actions">
                <button onClick={() => onEdit(data)}>
                    <Pencil size={16} />
                </button>
                <button onClick={() => onDelete(data)}>
                    <Trash2 size={16} />
                </button>
                <button onClick={handlePlay}>
                    <Play size={16} />
                </button>
            </div>

            <h3>{name}</h3>
            <p className="bento-description">
                Clase: <strong>{className}</strong>
            </p>

            <div className="bento-stats">
                <span>
                    <Heart /> {vitality}
                </span>
                <span>
                    <Swords /> {attack}
                </span>
                <span>
                    <ShieldHalf /> {defense}
                </span>
                <span>
                    <Brain /> {intelligence}
                </span>
                <span>
                    <Footprints /> {dexterity}
                </span>
                <span>
                    <Eye /> {perception}
                </span>
            </div>
        </div>
    );
};
