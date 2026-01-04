import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Lock, AtSign, UserRound } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebaseConfig";
import { useNavigate } from "react-router";
import { Header } from "../../components/ui/Header";
import { Footer } from "../../components/ui/Footer";
import "./Auth.css";

/**
 * Componente Register
 *
 * Renderiza el formulario de registro de usuarios y gestiona la creación
 * de cuentas utilizando Firebase Authentication y Firestore.
 * Al registrarse correctamente, redirige al usuario al dashboard.
 *
 * @component
 * @returns {JSX.Element} Vista de registro con header, formulario y footer
 */
export const Register = () => {
    /**
     * Estado para el nombre de usuario
     * @type {[string, Function]}
     */
    const [username, setUsername] = useState("");

    /**
     * Estado para el email del usuario
     * @type {[string, Function]}
     */
    const [email, setEmail] = useState("");

    /**
     * Estado para la contraseña
     * @type {[string, Function]}
     */
    const [password, setPassword] = useState("");

    /**
     * Estado para repetir la contraseña
     * @type {[string, Function]}
     */
    const [repeatPassword, setRepeatPassword] = useState("");

    /**
     * Estado para mensajes de error
     * @type {[string, Function]}
     */
    const [error, setError] = useState("");

    /**
     * Hook de navegación de React Router
     */
    const navigate = useNavigate();

    /**
     * Maneja el envío del formulario de registro.
     * Realiza validaciones de los campos y crea el usuario
     * en Firebase Authentication y Firestore.
     *
     * @async
     * @param {React.FormEvent<HTMLFormElement>} e Evento del formulario
     * @returns {Promise<void>}
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        /**
         * Resetea únicamente los campos de contraseña
         */
        const resetPasswords = () => {
            setPassword("");
            setRepeatPassword("");
        };

        if (!username || !email || !password || !repeatPassword) {
            setError("Todos los campos son obligatorios");
            resetPasswords();
            return;
        }

        if (username.length < 2) {
            setError("El username debe tener al menos 2 caracteres");
            resetPasswords();
            return;
        }

        /**
         * Expresión regular para validar emails
         * @type {RegExp}
         */
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            setError("Introduce un email válido");
            resetPasswords();
            return;
        }

        if (password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres");
            resetPasswords();
            return;
        }

        /**
         * Expresión regular para validar contraseña
         * - Al menos una mayúscula
         * - Al menos un número
         */
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).+$/;

        if (!passwordRegex.test(password)) {
            setError(
                "La contraseña debe tener al menos una mayúscula y un número"
            );
            resetPasswords();
            return;
        }

        if (password !== repeatPassword) {
            setError("Las contraseñas no coinciden");
            resetPasswords();
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            const user = userCredential.user;

            /**
             * Guarda la información adicional del usuario en Firestore
             */
            await setDoc(doc(db, "users", user.uid), {
                username,
                role: import.meta.env.VITE_USER,
            });

            navigate("/dashboard");
        } catch (err) {
            switch (err.code) {
                case "auth/email-already-in-use":
                    setError("Ese email ya está registrado");
                    resetPasswords();
                    break;
                case "auth/invalid-email":
                    setError("Email inválido");
                    resetPasswords();
                    break;
                default:
                    setError("Error al registrarse");
                    resetPasswords();
            }
        }
    };

    return (
        <>
            <div className="page">
                <Header />
                <div className="auth-container">
                    <motion.form
                        className="form"
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                        <div className="form__text">
                            <h1>¡Bienvenido a Questly!</h1>
                            <p>Ingresa tus datos</p>
                        </div>

                        <AnimatePresence>
                            {error && (
                                <motion.p
                                    className="error"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {error}
                                </motion.p>
                            )}
                        </AnimatePresence>

                        <div className="input__wrapper">
                            <input
                                type="text"
                                id="username"
                                name="username"
                                className="input__field"
                                placeholder="Tu usuario"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <label htmlFor="username" className="input__label">
                                Nombre de usuario
                            </label>
                            <UserRound className="input__icon" />
                        </div>

                        <div className="input__wrapper">
                            <input
                                type="text"
                                id="email"
                                name="email"
                                className="input__field"
                                placeholder="Tu Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label htmlFor="email" className="input__label">
                                Email
                            </label>
                            <AtSign className="input__icon" />
                        </div>

                        <div className="input__wrapper">
                            <input
                                type="password"
                                id="password"
                                className="input__field"
                                placeholder="Tu contraseña"
                                title="Mínimo 6 caracteres, una mayúscula y un número"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <label htmlFor="password" className="input__label">
                                Contraseña
                            </label>
                            <Lock className="input__icon" />
                        </div>

                        <div className="input__wrapper">
                            <input
                                type="password"
                                id="repeatPassword"
                                className="input__field"
                                placeholder="Repetir contraseña"
                                value={repeatPassword}
                                onChange={(e) =>
                                    setRepeatPassword(e.target.value)
                                }
                            />
                            <label
                                htmlFor="repeatPassword"
                                className="input__label"
                            >
                                Repetir contraseña
                            </label>
                            <Lock className="input__icon" />
                        </div>

                        <button type="submit" className="form__button">
                            Entrar
                        </button>
                    </motion.form>
                </div>
                <Footer />
            </div>
        </>
    );
};
