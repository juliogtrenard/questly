import { useState, useEffect } from "react";
import { addDoc, updateDoc, doc, collection } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { X } from "lucide-react";
import "./CreateClassModal.css";

/**
 * Componente CreateClassModal
 *
 * Modal para crear o editar una clase.
 * Dependiendo de si recibe 'classData', funciona en modo creación o edición.
 *
 * @component
 * @param {Object} props - Props del componente
 * @param {boolean} props.open - Indica si el modal está visible
 * @param {Function} props.onClose - Función para cerrar el modal
 * @param {Object|null} props.classData - Datos de la clase a editar (null si se crea)
 * @returns {JSX.Element|null} Modal de creación / edición de clase
 */
export const CreateClassModal = ({ open, onClose, classData }) => {
    /**
     * Indica si el modal está en modo edición.
     * Será true cuando exista classData.
     *
     * @type {boolean}
     */
    const isEdit = Boolean(classData);

    /**
     * Estados del formulario
     */
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [stats, setStats] = useState({
        vitality: 0,
        attack: 0,
        defense: 0,
        intelligence: 0,
        dexterity: 0,
        perception: 0,
    });

    /**
     * Estado para manejo de errores
     *
     * @type {string}
     */
    const [error, setError] = useState("");

    /**
     * Se ejecuta al abrir el modal o al cambiar classData.
     * - Si estamos editando, rellena el formulario con los datos existentes.
     * - Si estamos creando, limpia el formulario.
     */
    useEffect(() => {
        if (isEdit) {
            setName(classData.name);
            setDescription(classData.description);
            setStats(classData.stats);
        } else {
            setName("");
            setDescription("");
            setStats({
                vitality: 0,
                attack: 0,
                defense: 0,
                intelligence: 0,
                dexterity: 0,
                perception: 0,
            });
        }
    }, [classData, isEdit, open]);

    /**
     * Actualiza una estadística específica manteniendo el resto del estado.
     *
     * @function handleStatChange
     * @param {string} stat - Nombre de la estadística
     * @param {string|number} value - Nuevo valor de la estadística
     */
    const handleStatChange = (stat, value) => {
        setStats({ ...stats, [stat]: Number(value) });
    };

    /**
     * Maneja el envío del formulario.
     * Valida los datos y crea o actualiza la clase en Firestore.
     *
     * @async
     * @function handleSubmit
     * @param {Event} e - Evento del formulario
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!name.trim() || !description.trim()) {
            setError("Nombre y descripción son obligatorios");
            return;
        }

        try {
            if (isEdit) {
                // Actualizar clase existente
                await updateDoc(doc(db, "classes", classData.id), {
                    name,
                    description,
                    stats,
                });
            } else {
                // Crear nueva clase
                await addDoc(collection(db, "classes"), {
                    name,
                    description,
                    stats,
                });
            }

            onClose(); // Cierra modal y refresca la lista
        } catch (err) {
            console.error(err);
            setError("Error al guardar la clase");
        }
    };

    /**
     * Si el modal no está abierto, no se renderiza nada
     */
    if (!open) return null; // No se renderiza si no está abierto

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>
                    <X size={20} />
                </button>
                <h2>{isEdit ? "Editar clase" : "Crear nueva clase"}</h2>

                {error && <p className="error">{error}</p>}

                <form onSubmit={handleSubmit} className="modal-form">
                    <input
                        type="text"
                        placeholder="Nombre de la clase"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <textarea
                        placeholder="Descripción"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <div className="stats-grid">
                        {Object.entries(stats).map(([stat, value]) => (
                            <div key={stat} className="stat-input">
                                <label>
                                    {stat.charAt(0).toUpperCase() +
                                        stat.slice(1)}
                                </label>
                                <input
                                    type="number"
                                    value={value}
                                    onChange={(e) =>
                                        handleStatChange(stat, e.target.value)
                                    }
                                />
                            </div>
                        ))}
                    </div>

                    <button type="submit" className="modal-btn">
                        {isEdit ? "Guardar cambios" : "Crear clase"}
                    </button>
                </form>
            </div>
        </div>
    );
};
