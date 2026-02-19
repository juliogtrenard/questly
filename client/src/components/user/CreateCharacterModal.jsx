import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../firebase/firebaseConfig";
import { useAuth } from "../../context/AuthContext";
import "../ui/DataModal.css";
import { BaseModal } from "../ui/BaseModal";
import { StatsGrid } from "../ui/StatsGrid";
import { ErrorMessage } from "../ui/ErrorMessage";
import { FormInput } from "../ui/FormInput";
import { validateCharacter } from "../../validations/characterValidation";
import { useCharacters } from "../../hooks/useCharacters";

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

    const { createCharacter, updateCharacter } = useCharacters();

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
                    0,
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

        const validationError = validateCharacter({ name, selectedClass });

        if (validationError) {
            setError(validationError);
            return;
        }

        const payload = {
            name,
            classId: selectedClass.id,
            className: selectedClass.name,
            stats,
            userId: user.uid,
        };

        try {
            if (isEdit) {
                await updateCharacter(characterData.id, payload);
                toast.success("Personaje actualizado", { theme: "dark" });
            } else {
                await createCharacter(payload);
                toast.success("Personaje creado", { theme: "dark" });
            }

            onClose();
        } catch (err) {
            console.error(err);
            setError("Error al guardar el personaje");
        }
    };

    return (
        <BaseModal
            title={isEdit ? "Editar personaje" : "Crear personaje"}
            onClose={onClose}
        >
            <ErrorMessage error={error} />

            <form onSubmit={handleSubmit} className="modal-form">
                <FormInput
                    name="name"
                    placeholder="Nombre del personaje"
                    value={name}
                    onChange={setName}
                />

                <FormInput
                    type="select"
                    name="class"
                    value={selectedClass?.id || ""}
                    disabled={isEdit}
                    onChange={handleClassChange}
                    options={[
                        { value: "", label: "-- Selecciona una clase --" },
                        ...classes.map((c) => ({
                            value: c.id,
                            label: c.name,
                        })),
                    ]}
                />

                {selectedClass && (
                    <p>
                        Puntos restantes: <strong>{remainingPoints}</strong>
                    </p>
                )}

                <StatsGrid
                    stats={stats}
                    baseStats={selectedClass?.stats}
                    onChange={handleStatChange}
                    disabled={!selectedClass}
                />

                <button type="submit" className="modal-btn">
                    {isEdit ? "Guardar cambios" : "Crear personaje"}
                </button>
            </form>
        </BaseModal>
    );
};
