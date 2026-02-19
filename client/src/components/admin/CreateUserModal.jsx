import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "../ui/DataModal.css";
import { BaseModal } from "../ui/BaseModal";
import { ErrorMessage } from "../ui/ErrorMessage";
import { FormInput } from "../ui/FormInput";
import { validateUser } from "../../validations/userValidation";
import { useUsers } from "../../hooks/useUsers";

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

    const { createUser, updateUser } = useUsers();

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

        const validationError = validateUser({
            username,
            email,
            password,
            isEdit,
        });

        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            if (isEdit) {
                await updateUser(userData.id, { username, role });
                toast.success("Usuario actualizado", { theme: "dark" });
            } else {
                await createUser({ username, email, password, role });
                toast.success("Usuario creado", { theme: "dark" });
            }

            onClose();
        } catch (err) {
            console.error(err);
            if (err.code === "auth/email-already-in-use") {
                setError("El email ya está registrado");
            } else if (err.code === "auth/invalid-email") {
                setError("El email no es válido");
            } else {
                setError("Error al guardar usuario");
            }
        }
    };

    return (
        <BaseModal
            title={isEdit ? "Editar usuario" : "Crear usuario"}
            onClose={onClose}
        >
            <ErrorMessage error={error} />

            <form onSubmit={handleSubmit} className="modal-form">
                <FormInput
                    name="username"
                    placeholder="Nombre de usuario"
                    value={username}
                    onChange={setUsername}
                />

                {!isEdit && (
                    <>
                        <FormInput
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={setEmail}
                        />

                        <FormInput
                            type="password"
                            name="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={setPassword}
                        />
                    </>
                )}

                <FormInput
                    type="select"
                    name="role"
                    value={role}
                    onChange={setRole}
                    options={[
                        { value: "user", label: "Usuario" },
                        { value: "admin", label: "Administrador" },
                    ]}
                />

                <button type="submit" className="modal-btn">
                    Guardar
                </button>
            </form>
        </BaseModal>
    );
};
