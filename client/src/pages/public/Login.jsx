import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Lock, AtSign } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { auth } from "../../firebase/firebaseConfig";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { Header } from "../../components/ui/Header";
import { Footer } from "../../components/ui/Footer";
import "./Auth.css";

/**
 * Componente Login
 *
 * Renderiza el formulario de inicio de sesión y maneja la autenticación
 * mediante Firebase Authentication. Redirige al usuario según su rol
 * una vez autenticado.
 *
 * @component
 * @returns {JSX.Element} Vista de login con header, formulario y footer
 */
export const Login = () => {
    /**
     * Estado para el email del usuario
     * @type {[string, Function]}
     */
    const [email, setEmail] = useState("");

    /**
     * Estado para la contraseña del usuario
     * @type {[string, Function]}
     */
    const [password, setPassword] = useState("");

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
     * Usuario autenticado desde el AuthContext
     */
    const { user } = useAuth();

    /**
     * Redirige al usuario si ya está autenticado.
     * - Admin a /admin
     * - Usuario normal a /dashboard
     */
    useEffect(() => {
        if (user) {
            if (user.role === "admin") navigate("/admin");
            else navigate("/dashboard");
        }
    }, [user, navigate]);

    /**
     * Maneja el envío del formulario de login.
     * Valida los campos y autentica al usuario con Firebase.
     *
     * @async
     * @param {React.FormEvent<HTMLFormElement>} e Evento del formulario
     * @returns {Promise<void>}
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        /**
         * Resetea los campos del formulario
         */
        const reset = () => {
            setEmail("");
            setPassword("");
        };

        if (!email || !password) {
            setError("Todos los campos son obligatorios");
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            switch (err.code) {
                case "auth/user-not-found":
                case "auth/wrong-password":
                case "auth/invalid-credential":
                    setError("Email o contraseña incorrectos");
                    reset();
                    break;
                case "auth/invalid-email":
                    setError("Formato de email inválido");
                    reset();
                    break;
                default:
                    setError("Error al iniciar sesión");
                    reset();
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
                            <h1>¡Bienvenido de nuevo!</h1>
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
                                id="email"
                                name="email"
                                className="input__field"
                                placeholder="Tu email"
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
                                id="password"
                                type="password"
                                className="input__field"
                                placeholder="Tu contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <label htmlFor="password" className="input__label">
                                Contraseña
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
