import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import "../ui/DataModal.css";

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

        if (!id.trim() || !title.trim() || !text.trim()) {
            setError("ID, título y texto son obligatorios");
            return;
        }

        const eventIdRegex = /^[a-z][a-z0-9_]*$/;
        const eventTitleRegex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s.,:;!?()'"-]+$/;
        const eventTextRegex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s.,:;!?()'"-]+$/;

        if (!eventIdRegex.test(id)) {
            setError(
                "El ID debe empezar por letra y solo contener letras minúsculas, números y _"
            );
            return;
        }

        if (!eventTitleRegex.test(title)) {
            setError("El título contiene caracteres inválidos");
            return;
        }

        if (!eventTextRegex.test(text)) {
            setError("El texto del evento contiene caracteres inválidos");
            return;
        }

        for (let i = 0; i < options.length; i++) {
            const opt = options[i];

            if (!opt.text.trim()) {
                setError(`La opción ${i + 1} no puede estar vacía`);
                return;
            }

            if (!eventTextRegex.test(opt.text)) {
                setError(`La opción ${i + 1} contiene caracteres inválidos`);
                return;
            }
        }

        const payload = { id, title, text, options };

        try {
            if (event && event.docId) {
                await updateDoc(doc(db, "events", event.docId), payload);

                toast.success("Evento editado", {
                    theme: "dark",
                });
            } else {
                await addDoc(collection(db, "events"), payload);

                toast.success("Evento creado", {
                    theme: "dark",
                });
            }
            onSaved();
        } catch (err) {
            console.error(err);
            setError("Error al guardar el evento");
        }
    };

    return (
        <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="modal-content"
                initial={{ scale: 0.9, opacity: 0, y: 60 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 60 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            >
                <button className="modal-close" onClick={onClose}>
                    <X size={18} />
                </button>

                <h2>{event ? "Editar evento" : "Crear evento"}</h2>

                {error && <p className="error">{error}</p>}

                <form className="modal-form" onSubmit={handleSubmit}>
                    <input
                        placeholder="ID del evento (ej: start_forest)"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    />
                    <input
                        placeholder="Título del evento"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        placeholder="Texto del evento"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        rows={4}
                    />

                    <h3>Opciones</h3>
                    {options.map((opt, index) => (
                        <div key={index} className="option-block">
                            <input
                                placeholder="Texto de la opción"
                                value={opt.text}
                                onChange={(e) =>
                                    handleOptionChange(
                                        index,
                                        "text",
                                        e.target.value
                                    )
                                }
                            />
                            <select
                                value={opt.nextEventId}
                                onChange={(e) =>
                                    handleOptionChange(
                                        index,
                                        "nextEventId",
                                        e.target.value
                                    )
                                }
                            >
                                <option value="">-- Evento siguiente --</option>
                                {existingEvents.map((ev) => (
                                    <option key={ev.docId} value={ev.id}>
                                        {ev.title || ev.id}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={opt.requirements?.stat || ""}
                                onChange={(e) =>
                                    handleRequirementChange(
                                        index,
                                        "stat",
                                        e.target.value
                                    )
                                }
                            >
                                <option value="">
                                    -- Estadística requerida --
                                </option>
                                {statOptions.map((stat) => (
                                    <option key={stat} value={stat}>
                                        {stat}
                                    </option>
                                ))}
                            </select>

                            <input
                                type="number"
                                min="0"
                                placeholder="Valor mínimo"
                                value={opt.requirements?.minValue || ""}
                                onChange={(e) =>
                                    handleRequirementChange(
                                        index,
                                        "minValue",
                                        e.target.value
                                    )
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
            </motion.div>
        </motion.div>
    );
};
