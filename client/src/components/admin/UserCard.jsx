import { Pencil, Trash2, Shield, User } from "lucide-react";
import "../ui/DataCard.css";

/**
 * Tarjeta que muestra la información de un usuario y acciones de editar y eliminar.
 *
 * @component
 * @param {Object} props - Props del componente.
 * @param {Object} props.data - Datos del usuario.
 * @param {string} props.data.username - Nombre de usuario.
 * @param {string} props.data.role - Rol del usuario ("admin" o "user").
 * @param {Function} props.onEdit - Función que se ejecuta al editar el usuario.
 * @param {Function} props.onDelete - Función que se ejecuta al eliminar el usuario.
 *
 * @returns {JSX.Element} Componente UserCard renderizado.
 */
export const UserCard = ({ data, onEdit, onDelete }) => {
    const { username, role } = data;

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

            <h3>{username}</h3>

            <span>
                {role === "admin" ? <Shield size={16} /> : <User size={16} />}
                {role}
            </span>
        </div>
    );
};
