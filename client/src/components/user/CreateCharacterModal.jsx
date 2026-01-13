import { useEffect, useState } from "react";
import {
    addDoc,
    updateDoc,
    doc,
    collection,
    getDocs,
} from "firebase/firestore";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { db } from "../../firebase/firebaseConfig";
import { useAuth } from "../../context/AuthContext";
import "../ui/DataModal.css";

const INITIAL_STATS = {
    vitality: 0,
    attack: 0,
    defense: 0,
    intelligence: 0,
    dexterity: 0,
    perception: 0,
};

/**
 * Componente para crear o editar un personaje.
 * Permite ingresar el nombre, seleccionar una clase y asignar puntos a las estadísticas del personaje.
 * Los cambios se guardan en Firestore.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {Function} props.onClose - Función para cerrar la modal.
 * @param {Object} [props.characterData] - Datos del personaje a editar.
 * @param {string} props.characterData.name - El nombre del personaje.
 * @param {string} props.characterData.classId - El ID de la clase seleccionada para el personaje.
 * @param {Object} props.characterData.stats - Las estadísticas del personaje.
 * @param {string} props.characterData.id - El ID del personaje en la base de datos.
 *
 * @returns {JSX.Element} Un modal para crear o editar un personaje.
 */
export const CreateCharacterModal = ({ onClose, characterData }) => {
    const { user } = useAuth();

    const isEdit = Boolean(characterData);

    const [name, setName] = useState("");
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState(null);

    const [stats, setStats] = useState(INITIAL_STATS);
    const [remainingPoints, setRemainingPoints] = useState(10);

    const [error, setError] = useState("");

    useEffect(() => {
        const fetchClasses = async () => {
            const snapshot = await getDocs(collection(db, "classes"));
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setClasses(data);
        };

        fetchClasses();
    }, []);

    useEffect(() => {
        if (isEdit && classes.length) {
            setName(characterData.name);

            const cl = classes.find((c) => c.id === characterData.classId);

            if (cl) {
                setSelectedClass(cl);
                setStats(characterData.stats);
                const spentPoints = Object.keys(cl.stats).reduce(
                    (acc, stat) =>
                        acc + (characterData.stats[stat] - cl.stats[stat]),
                    0
                );

                setRemainingPoints(10 - spentPoints);
            }
        }
    }, [isEdit, characterData, classes]);

    const handleClassChange = (classId) => {
        const cl = classes.find((c) => c.id === classId);
        if (!cl) return;

        setSelectedClass(cl);
        setStats({ ...cl.stats });
        setRemainingPoints(10);
    };

    const handleStatChange = (stat, value) => {
        if (!selectedClass) return;

        const baseValue = selectedClass.stats[stat];
        const newValue = Number(value);
        const currentValue = stats[stat];
        const diff = newValue - currentValue;

        if (newValue < baseValue) return;
        if (remainingPoints - diff < 0) return;

        setStats({
            ...stats,
            [stat]: newValue,
        });

        setRemainingPoints(remainingPoints - diff);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!name.trim()) {
            setError("El nombre es obligatorio");
            return;
        }

        const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s'-]+$/;

        if (!nameRegex.test(name)) {
            setError("El nombre contiene caracteres inválidos");
            return;
        }

        if (!selectedClass) {
            setError("Debes seleccionar una clase");
            return;
        }

        try {
            const payload = {
                name,
                classId: selectedClass.id,
                className: selectedClass.name,
                stats,
                userId: user.uid,
            };

            if (isEdit) {
                await updateDoc(
                    doc(db, "characters", characterData.id),
                    payload
                );

                toast.success("Personaje actualizado", { theme: "dark" });
            } else {
                await addDoc(collection(db, "characters"), payload);

                toast.success("Personaje creado", { theme: "dark" });
            }

            onClose();
        } catch (err) {
            console.error(err);
            setError("Error al guardar el personaje");
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
                    <X size={20} />
                </button>

                <h2>{isEdit ? "Editar personaje" : "Crear personaje"}</h2>

                {error && <p className="error">{error}</p>}

                <form onSubmit={handleSubmit} className="modal-form">
                    <input
                        type="text"
                        placeholder="Nombre del personaje"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <select
                        value={selectedClass?.id || ""}
                        onChange={(e) => handleClassChange(e.target.value)}
                        disabled={isEdit}
                    >
                        <option value="">-- Selecciona una clase --</option>
                        {classes.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.name}
                            </option>
                        ))}
                    </select>

                    {selectedClass && (
                        <p>
                            Puntos restantes: <strong>{remainingPoints}</strong>
                        </p>
                    )}

                    <div className="stats-grid">
                        {Object.entries(stats).map(([stat, value]) => (
                            <div key={stat} className="stat-input">
                                <label>
                                    {stat.charAt(0).toUpperCase() +
                                        stat.slice(1)}{" "}
                                    (base {selectedClass?.stats[stat] ?? 0})
                                </label>
                                <input
                                    type="number"
                                    min={selectedClass?.stats[stat] ?? 0}
                                    value={value}
                                    disabled={!selectedClass}
                                    onChange={(e) =>
                                        handleStatChange(stat, e.target.value)
                                    }
                                />
                            </div>
                        ))}
                    </div>

                    <button type="submit" className="modal-btn">
                        {isEdit ? "Guardar cambios" : "Crear personaje"}
                    </button>
                </form>
            </motion.div>
        </motion.div>
    );
};
