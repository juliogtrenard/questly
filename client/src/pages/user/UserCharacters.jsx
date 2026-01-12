import { useEffect, useState } from "react";
import {
    collection,
    getDocs,
    deleteDoc,
    doc,
    query,
    where,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { Plus } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CharacterCard } from "../../components/user/CharacterCard";
import { CreateCharacterModal } from "../../components/user/CreateCharacterModal";
import { Loader } from "../../components/ui/Loader";
import { DeleteModal } from "../../components/ui/DeleteModal";
import { useAuth } from "../../context/AuthContext";

/**
 * Página para gestionar los personajes del usuario. Permite visualizar, crear, editar y eliminar personajes.
 *
 * @component
 */
export const UserCharacters = () => {
    const { user } = useAuth();

    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showModal, setShowModal] = useState(false);
    const [selectedCharacter, setSelectedCharacter] = useState(null);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [characterToDelete, setCharacterToDelete] = useState(null);

    const fetchCharacters = async () => {
        const q = query(
            collection(db, "characters"),
            where("userId", "==", user.uid)
        );

        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        setCharacters(data);
        setLoading(false);
    };

    const handleAdd = () => {
        setSelectedCharacter(null);
        setShowModal(true);
    };

    const handleEdit = (character) => {
        setSelectedCharacter(character);
        setShowModal(true);
    };

    const handleDelete = (character) => {
        setCharacterToDelete(character);
        setShowDeleteModal(true);
    };

    const confirmDelete = async (character) => {
        await deleteDoc(doc(db, "characters", character.id));
        toast.success("Personaje eliminado", { theme: "dark" });
        fetchCharacters();
    };

    useEffect(() => {
        fetchCharacters();
    }, []);

    return (
        <>
            <div className="admin-page-header">
                <div>
                    <h1>Mis personajes</h1>
                    <p>Crea y administra tus personajes</p>
                </div>

                <button className="primary-btn" onClick={handleAdd}>
                    <Plus size={18} />
                    Crear personaje
                </button>
            </div>

            {loading ? (
                <Loader />
            ) : (
                <div className="bento-grid">
                    {characters.map((c) => (
                        <CharacterCard
                            key={c.id}
                            data={c}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}

            <AnimatePresence>
                {showModal && (
                    <CreateCharacterModal
                        characterData={selectedCharacter}
                        onClose={() => {
                            setShowModal(false);
                            setSelectedCharacter(null);
                            fetchCharacters();
                        }}
                    />
                )}

                {showDeleteModal && characterToDelete && (
                    <DeleteModal
                        item={characterToDelete}
                        onClose={() => setShowDeleteModal(false)}
                        onConfirm={confirmDelete}
                    />
                )}
            </AnimatePresence>

            <ToastContainer position="top-right" autoClose={3000} />
        </>
    );
};
