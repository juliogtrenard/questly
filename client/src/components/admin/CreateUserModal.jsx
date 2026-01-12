import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, updateDoc, doc } from "firebase/firestore";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { db } from "../../firebase/firebaseConfig";
import { adminAuth } from "../../firebase/adminAuth";
import { toast } from "react-toastify";
import "../ui/DataModal.css";

/**
 * Modal para crear o editar un usuario.
 * Si se recibe userData, el modal funciona en modo edición, si es null se crea uno nuevo.
 *
 * @component
 * @param {Object} props - Props del componente.
 * @param {Function} props.onClose - Función que cierra el modal.
 * @param {Object} [props.userData] - Datos del usuario a editar
 * @param {string} props.userData.id - ID del usuario en Firestore.
 * @param {string} props.userData.username - Nombre de usuario.
 * @param {string} props.userData.role - Rol del usuario.
 *
 * @returns {JSX.Element} Componente modal para crear o editar un usuario.
 */
export const CreateUserModal = ({ onClose, userData }) => {
    /**
     * Indica si el modal está en modo edición.
     * @type {boolean}
     */
    const isEdit = Boolean(userData);

    /** @type {[string, Function]} */
    const [username, setUsername] = useState("");

    /** @type {[string, Function]} */
    const [email, setEmail] = useState("");

    /** @type {[string, Function]} */
    const [password, setPassword] = useState("");

    /** @type {[string, Function]} */
    const [role, setRole] = useState("user");

    /** @type {[string, Function]} */
    const [error, setError] = useState("");

    /**
     * Inicializa los campos cuando el modal está en modo edición.
     */
    useEffect(() => {
        if (isEdit) {
            setUsername(userData.username || "");
            setRole(userData.role || "user");
        }
    }, [isEdit, userData]);

    /**
     * Maneja el envío del formulario para crear o actualizar un usuario.
     *
     * @async
     * @param {React.FormEvent<HTMLFormElement>} e - Evento del formulario.
     * @returns {Promise<void>}
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!username.trim()) {
            setError("El nombre de usuario es obligatorio");
            return;
        }

        try {
            if (isEdit) {
                await updateDoc(doc(db, "users", userData.id), {
                    username,
                    role,
                });

                toast.success("Usuario actualizado", { theme: "dark" });
            } else {
                if (!email || !password) {
                    setError("Email y contraseña son obligatorios");
                    return;
                }

                const cred = await createUserWithEmailAndPassword(
                    adminAuth,
                    email,
                    password
                );

                await setDoc(doc(db, "users", cred.user.uid), {
                    username,
                    role,
                });

                toast.success("Usuario creado", { theme: "dark" });
            }

            onClose();
        } catch (err) {
            console.error(err);
            setError("Error al guardar usuario");
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

                <h2>{isEdit ? "Editar usuario" : "Crear usuario"}</h2>

                {error && <p className="error">{error}</p>}

                <form onSubmit={handleSubmit} className="modal-form">
                    <input
                        placeholder="Nombre de usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    {!isEdit && (
                        <>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </>
                    )}

                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="user">Usuario</option>
                        <option value="admin">Administrador</option>
                    </select>

                    <button type="submit" className="modal-btn">
                        Guardar
                    </button>
                </form>
            </motion.div>
        </motion.div>
    );
};
