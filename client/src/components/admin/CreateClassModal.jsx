import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "../ui/DataModal.css";
import { BaseModal } from "../ui/BaseModal";
import { StatsGrid } from "../ui/StatsGrid";
import { ErrorMessage } from "../ui/ErrorMessage";
import { FormInput } from "../ui/FormInput";
import { validateClass } from "../../validations/classValidation";
import { useClasses } from "../../hooks/useClasses";

/**
 * Componente CreateClassModal
 *
 * Modal para crear o editar una clase.
 * Dependiendo de si recibe 'classData', funciona en modo creación o edición.
 *
 * @component
 * @param {Object} props - Props del componente
 * @param {Function} props.onClose - Función para cerrar el modal
 * @param {Object|null} props.classData - Datos de la clase a editar (null si se crea)
 * @returns {JSX.Element|null} Modal de creación / edición de clase
 */
export const CreateClassModal = ({ onClose, classData }) => {
    /**
     * Indica si el modal está en modo edición.
     * Será true cuando exista classData.
     *
     * @type {boolean}
     */
    const isEdit = Boolean(classData);

    const { createClass, updateClass } = useClasses();

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
    }, [classData, isEdit]);

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

        const validationError = validateClass({ name, description });

        if (validationError) {
            setError(validationError);
            return;
        }

        const payload = { name, description, stats };

        try {
            if (isEdit) {
                await updateClass(classData.id, payload);
                toast.success("Clase actualizada", { theme: "dark" });
            } else {
                await createClass(payload);
                toast.success("Clase creada", { theme: "dark" });
            }

            onClose(); // Cierra modal y refresca la lista
        } catch (err) {
            console.error(err);
            setError("Error al guardar la clase");
        }
    };

    return (
        <BaseModal
            title={isEdit ? "Editar clase" : "Crear nueva clase"}
            onClose={onClose}
        >
            <ErrorMessage error={error} />

            <form onSubmit={handleSubmit} className="modal-form">
                <FormInput
                    name="name"
                    placeholder="Nombre de la clase"
                    value={name}
                    onChange={setName}
                />

                <FormInput
                    type="textarea"
                    name="description"
                    placeholder="Descripción"
                    value={description}
                    onChange={setDescription}
                />

                <StatsGrid stats={stats} onChange={handleStatChange} />

                <button type="submit" className="modal-btn">
                    {isEdit ? "Guardar cambios" : "Crear clase"}
                </button>
            </form>
        </BaseModal>
    );
};
