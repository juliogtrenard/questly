import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "../ui/DataModal.css";
import { BaseModal } from "../ui/BaseModal";
import { ErrorMessage } from "../ui/ErrorMessage";
import { FormInput } from "../ui/FormInput";
import { validateEvent } from "../../validations/eventValidation";
import { useEvents } from "../../hooks/useEvents";

/**
 * Componente CreateEventModal
 *
 * Modal para crear y editar eventos.
 * Funciona para:
 * - Crear evento (cuando event es null)
 * - Editar evento (cuando event no es null)
 *
 * @component
 *
 * @param {Object} props - Propiedades del componente
 * @param {Function} props.onClose - Cierra la modal
 * @param {Function} props.onSaved - Ejecutada al guardar correctamente
 * @param {Event|null} props.event - Evento a editar (null si se crea uno nuevo)
 * @param {Event[]} props.existingEvents - Eventos existentes para enlazar
 *
 * @returns {JSX.Element} Modal de creación / edición de eventos
 */
export const CreateEventModal = ({
    onClose,
    onSaved,
    event,
    existingEvents,
}) => {
    const { createEvent, updateEvent } = useEvents();

    /**
     * Estado del formulario
     */
    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");

    /**
     * Opciones del evento
     * @type {[EventOption[], Function]}
     */
    const [options, setOptions] = useState([]);

    /**
     * Mensaje de error mostrado al usuario
     * @type {[string, Function]}
     */
    const [error, setError] = useState("");

    /**
     * Estadísticas disponibles para requisitos
     * Se usa para construir el <select>
     */
    const statOptions = [
        "vitality",
        "attack",
        "defense",
        "intelligence",
        "dexterity",
        "perception",
    ];

    /**
     * Modifica un campo de una opción del evento
     * (text o nextEventId)
     *
     * @param {number} index - Índice de la opción a modificar
     * @param {"text"|"nextEventId"} field - Campo a actualizar
     * @param {string} value - Nuevo valor
     */
    const handleOptionChange = (index, field, value) => {
        const updated = [...options];
        updated[index][field] = value;
        setOptions(updated);
    };

    /**
     * Modifica un requisito de una opción del evento
     * (stat o minValue)
     *
     * Crea el objeto 'requirements' si no existe y convierte
     * minValue a número.
     *
     * @param {number} index - Índice de la opción
     * @param {"stat"|"minValue"} field - Campo del requisito
     * @param {string|number} value - Nuevo valor
     */
    const handleRequirementChange = (index, field, value) => {
        const updated = [...options];
        if (!updated[index].requirements) updated[index].requirements = {};
        updated[index].requirements[field] =
            field === "minValue" ? Number(value) : value;
        setOptions(updated);
    };

    /**
     * Añade una nueva opción vacía al evento
     */
    const addOption = () => {
        setOptions([
            ...options,
            { text: "", nextEventId: "", requirements: {} },
        ]);
    };

    /**
     * Elimina una opción del evento por índice
     *
     * @param {number} index - Índice de la opción a eliminar
     */
    const removeOption = (index) => {
        const updated = [...options];
        updated.splice(index, 1);
        setOptions(updated);
    };

    /**
     * Se ejecuta al abrir el modal o cambiar el evento a editar
     */
    useEffect(() => {
        if (event) {
            setId(event.id || "");
            setTitle(event.title || "");
            setText(event.text || "");
            setOptions(event.options || []);
        } else {
            setId("");
            setTitle("");
            setText("");
            setOptions([]);
        }
    }, [event]);

    /**
     * Maneja el envío del formulario
     * Valida campos obligatorios y guarda el evento en Firestore
     *
     * @async
     * @param {React.FormEvent<HTMLFormElement>} e - Evento de submit
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const validationError = validateEvent({ id, title, text, options });

        if (validationError) {
            setError(validationError);
            return;
        }

        const payload = { id, title, text, options };

        try {
            if (event?.docId) {
                await updateEvent(event.docId, payload);
                toast.success("Evento editado", { theme: "dark" });
            } else {
                await createEvent(payload);
                toast.success("Evento creado", { theme: "dark" });
            }

            onSaved();
        } catch (err) {
            console.error(err);
            setError("Error al guardar el evento");
        }
    };

    return (
        <BaseModal
            title={event ? "Editar evento" : "Crear evento"}
            onClose={onClose}
        >
            <ErrorMessage error={error} />

            <form className="modal-form" onSubmit={handleSubmit}>
                <FormInput
                    name="id"
                    placeholder="ID del evento"
                    value={id}
                    onChange={setId}
                />

                <FormInput
                    name="title"
                    placeholder="Título del evento"
                    value={title}
                    onChange={setTitle}
                />

                <FormInput
                    type="textarea"
                    name="text"
                    placeholder="Texto del evento"
                    value={text}
                    onChange={setText}
                    rows={4}
                />

                <h3>Opciones</h3>
                {options.map((opt, index) => (
                    <div key={index} className="option-block">
                        <FormInput
                            placeholder="Texto de la opción"
                            value={opt.text}
                            onChange={(val) =>
                                handleOptionChange(index, "text", val)
                            }
                        />

                        <FormInput
                            type="select"
                            value={opt.nextEventId}
                            onChange={(val) =>
                                handleOptionChange(index, "nextEventId", val)
                            }
                            options={[
                                { value: "", label: "-- Evento siguiente --" },
                                ...existingEvents.map((ev) => ({
                                    value: ev.id,
                                    label: ev.title || ev.id,
                                })),
                            ]}
                        />

                        <FormInput
                            type="select"
                            value={opt.requirements?.stat || ""}
                            onChange={(val) =>
                                handleRequirementChange(index, "stat", val)
                            }
                            options={[
                                {
                                    value: "",
                                    label: "-- Estadística requerida --",
                                },
                                ...statOptions.map((stat) => ({
                                    value: stat,
                                    label: stat,
                                })),
                            ]}
                        />

                        <FormInput
                            type="number"
                            min="0"
                            placeholder="Valor mínimo"
                            value={opt.requirements?.minValue || ""}
                            onChange={(val) =>
                                handleRequirementChange(index, "minValue", val)
                            }
                        />

                        <button
                            type="button"
                            onClick={() => removeOption(index)}
                            className="remove-option-btn"
                        >
                            Eliminar opción
                        </button>
                    </div>
                ))}

                <button
                    type="button"
                    className="add-option-btn"
                    onClick={addOption}
                >
                    Agregar opción
                </button>

                <button type="submit" className="modal-btn">
                    Guardar evento
                </button>
            </form>
        </BaseModal>
    );
};
