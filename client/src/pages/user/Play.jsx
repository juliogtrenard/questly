import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { collection, query, where, getDocs } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import {
    Flag,
    BookOpen,
    Heart,
    Swords,
    ShieldHalf,
    Brain,
    Footprints,
    Eye,
} from "lucide-react";
import { db } from "../../firebase/firebaseConfig";
import { Loader } from "../../components/ui/Loader";
import "./Play.css";

/**
 * Página Play
 *
 * Gestiona una partida:
 * - Carga el evento inicial (start_forest)
 * - Permite avanzar según las opciones
 * - Aplica requisitos por estadísticas
 * - Finaliza cuando no hay mas opciones
 */
export const Play = () => {
    const navigate = useNavigate();
    const location = useLocation();

    /**
     * Información del personaje con el que se está jugando
     */
    const character = location.state?.character;

    /**
     * Estado del evento actual
     */
    const [currentEvent, setCurrentEvent] = useState(null);

    /**
     * Estado de final de partida
     */
    const [isFinished, setIsFinished] = useState(false);

    /**
     * Estado de carga
     */
    const [loading, setLoading] = useState(true);

    /**
     * Si no hay personaje, redirige
     */
    useEffect(() => {
        if (!character) {
            navigate("/dashboard/characters");
        }
    }, [character, navigate]);

    /**
     * Carga un evento por su ID lógico
     */
    const loadEvent = async (eventId) => {
        const q = query(collection(db, "events"), where("id", "==", eventId));

        const snapshot = await getDocs(q);

        if (snapshot.empty) return null;

        return {
            docId: snapshot.docs[0].id,
            ...snapshot.docs[0].data(),
        };
    };

    /**
     * Carga el evento inicial
     */
    useEffect(() => {
        const init = async () => {
            const firstEvent = await loadEvent("start_forest");
            setCurrentEvent(firstEvent);
            setLoading(false);
        };

        init();
    }, []);

    /**
     * Comprueba si el personaje cumple los requisitos
     */
    const canChooseOption = (option) => {
        if (!option.requirements?.stat) return true;

        const { stat, minValue } = option.requirements;

        return character.stats?.[stat] >= minValue;
    };

    /**
     * Al elegir una opción
     */
    const handleOptionClick = async (option) => {
        if (!option.nextEventId) {
            // Es el último evento
            setCurrentEvent({ ...currentEvent, isLast: true });
            return;
        }

        const nextEvent = await loadEvent(option.nextEventId);

        if (!nextEvent) {
            setCurrentEvent({ ...currentEvent, isLast: true });
        } else {
            setCurrentEvent(nextEvent);
        }
    };

    /**
     * UI de carga
     */
    if (loading) {
        return <Loader />;
    }

    /**
     * Fin de la aventura
     */
    if (isFinished) {
        return (
            <motion.div
                className="play-end"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
            >
                <h2>Fin de la aventura</h2>
                <p>{character.name} ha llegado al final de su camino.</p>
                <button
                    className="play-back-btn"
                    onClick={() => navigate("/dashboard/characters")}
                >
                    <Flag size={18} style={{ marginRight: 6 }} />
                    Volver
                </button>
            </motion.div>
        );
    }

    /**
     * Evento activo
     */
    return (
        <div className="play-container">
            <motion.div
                className="play-character-card"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h3>{character.name}</h3>
                <div className="play-character-stats">
                    <span>
                        <Heart /> {character.stats.vitality}
                    </span>
                    <span>
                        <Swords /> {character.stats.attack}
                    </span>
                    <span>
                        <ShieldHalf /> {character.stats.defense}
                    </span>
                    <span>
                        <Brain /> {character.stats.intelligence}
                    </span>
                    <span>
                        <Footprints /> {character.stats.dexterity}
                    </span>
                    <span>
                        <Eye /> {character.stats.perception}
                    </span>
                </div>
            </motion.div>

            {/* Evento actual */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentEvent?.docId}
                    className="play-event-card"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2>
                        <BookOpen size={20} style={{ marginRight: 8 }} />
                        {currentEvent?.title}
                    </h2>
                    <p>{currentEvent?.text}</p>

                    {currentEvent?.isLast || !currentEvent?.options?.length ? (
                        <motion.button
                            className="play-back-btn"
                            onClick={() => setIsFinished(true)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Flag size={18} style={{ marginRight: 6 }} />
                            Terminar aventura
                        </motion.button>
                    ) : (
                        <div className="play-options">
                            {currentEvent.options.map((opt, index) => {
                                const allowed = canChooseOption(opt);
                                return (
                                    <motion.button
                                        key={index}
                                        className={`play-option-btn`}
                                        disabled={!allowed}
                                        onClick={() => handleOptionClick(opt)}
                                        whileHover={{
                                            scale: allowed ? 1.02 : 1,
                                        }}
                                        whileTap={{
                                            scale: allowed ? 0.97 : 1,
                                        }}
                                    >
                                        {opt.text}
                                        {opt.requirements?.stat && (
                                            <small className="play-option-requirement">
                                                Requiere {opt.requirements.stat}{" "}
                                                ≥ {opt.requirements.minValue}
                                            </small>
                                        )}
                                    </motion.button>
                                );
                            })}
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};
