import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Plus } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import { db } from "../../firebase/firebaseConfig";
import { useAuth } from "../../context/AuthContext";
import { UserCard } from "../../components/admin/UserCard";
import { CreateUserModal } from "../../components/admin/CreateUserModal";
import { DeleteModal } from "../../components/ui/DeleteModal";
import { Loader } from "../../components/ui/Loader";

/**
 * Página de administración de usuarios.
 * Permite listar, crear, editar y eliminar usuarios registrados
 * (excepto el usuario actualmente autenticado).
 *
 * @component
 * @returns {JSX.Element} Componente AdminUsers.
 */
export const AdminUsers = () => {
    /**
     * Usuario autenticado actual.
     * @type {{ uid: string }}
     */
    const { user } = useAuth();

    /** @type {[Array<Object>, Function]} */
    const [users, setUsers] = useState([]);

    /** @type {[boolean, Function]} */
    const [loading, setLoading] = useState(true);

    /** @type {[boolean, Function]} */
    const [showModal, setShowModal] = useState(false);

    /** @type {[Object|null, Function]} */
    const [selectedUser, setSelectedUser] = useState(null);

    /** @type {[Object|null, Function]} */
    const [userToDelete, setUserToDelete] = useState(null);

    /**
     * Obtiene la lista de usuarios desde Firestore,
     * excluyendo al usuario actualmente autenticado.
     *
     * @async
     * @returns {Promise<void>}
     */
    const fetchUsers = async () => {
        const snapshot = await getDocs(collection(db, "users"));
        const data = snapshot.docs
            .map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))
            .filter((u) => u.id !== user.uid);
        setUsers(data);
        setLoading(false);
    };

    /**
     * Carga inicial de usuarios al montar el componente.
     */
    useEffect(() => {
        fetchUsers();
    }, []);

    /**
     * Abre el modal en modo edición para el usuario seleccionado.
     *
     * @param {Object} user - Usuario a editar.
     */
    const handleEdit = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    /**
     * Abre el modal de confirmación para eliminar un usuario.
     *
     * @param {Object} user - Usuario a eliminar.
     */
    const handleDelete = (user) => {
        setUserToDelete(user);
    };

    /**
     * Confirma y ejecuta la eliminación del usuario.
     * Solo se elimina el documento en Firestore.
     *
     * @async
     * @param {Object} user - Usuario a eliminar.
     * @returns {Promise<void>}
     */
    const confirmDelete = async (user) => {
        // Se borra en Firestore.
        // Borrar en Auth requiere Cloud Functions
        await deleteDoc(doc(db, "users", user.id));
        setUserToDelete(null);
        toast.success("Usuario eliminado", { theme: "dark" });
        fetchUsers();
    };

    return (
        <>
            <div className="admin-page-header">
                <div>
                    <h1>Gestión de usuarios</h1>
                    <p>Crea, edita y administra los usuarios</p>
                </div>

                <button
                    className="primary-btn"
                    onClick={() => {
                        setSelectedUser(null);
                        setShowModal(true);
                    }}
                >
                    <Plus size={18} />
                    Crear usuario
                </button>
            </div>

            {loading ? (
                <Loader />
            ) : (
                <div className="bento-grid">
                    {users.map((u) => (
                        <UserCard
                            key={u.id}
                            data={u}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}

            <AnimatePresence>
                {showModal && (
                    <CreateUserModal
                        userData={selectedUser}
                        onClose={() => {
                            setShowModal(false);
                            setSelectedUser(null);
                            fetchUsers();
                        }}
                    />
                )}

                {userToDelete && (
                    <DeleteModal
                        item={userToDelete}
                        onClose={() => setUserToDelete(null)}
                        onConfirm={confirmDelete}
                    />
                )}
            </AnimatePresence>

            <ToastContainer position="top-right" autoClose={3000} />
        </>
    );
};
