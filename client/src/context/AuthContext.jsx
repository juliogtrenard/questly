import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

/**
 * Contexto de autenticación.
 *
 * Proporciona información del usuario autenticado,
 * el estado de carga y funciones relacionadas con la sesión.
 *
 * @type {React.Context}
 */
const AuthContext = createContext();

/**
 * Proveedor de autenticación.
 *
 * Envuelve la aplicación y mantiene el estado global
 * de autenticación del usuario usando Firebase Auth y Firestore.
 *
 * @component
 * @param {Object} props - Props del componente
 * @param {React.ReactNode} props.children - Componentes hijos que tendrán acceso al contexto
 *
 * @returns {JSX.Element} Proveedor del contexto de autenticación
 */
export const AuthProvider = ({ children }) => {
    /**
     * Estado del usuario autenticado.
     * Puede ser null si no hay sesión activa.
     *
     * @type {[Object|null, Function]}
     */
    const [user, setUser] = useState(null);

    /**
     * Estado de carga de la autenticación.
     * Se usa para saber si Firebase aún está validando la sesión.
     *
     * @type {[boolean, Function]}
     */
    const [loading, setLoading] = useState(true);

    /**
     * Escucha cambios en el estado de autenticación.
     *
     * Se ejecuta una sola vez al montar el componente.
     * Firebase notifica si el usuario inicia o cierra sesión.
     */
    useEffect(() => {
        // Se ejecuta automáticamente cuando el usuario inicia sesión, cierra sesión o recarga la página
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                try {
                    // Referencia al documento del usuario en Firestore
                    const docRef = doc(db, "users", firebaseUser.uid);
                    const docSnap = await getDoc(docRef);

                    // Si el documento existe, combina datos de Auth + Firestore
                    if (docSnap.exists()) {
                        setUser({ ...firebaseUser, ...docSnap.data() });
                    } else {
                        // Si no existe el documento, usa solo los datos de Auth
                        setUser(firebaseUser);
                    }
                } catch (error) {
                    console.error(
                        "Error al obtener el rol del usuario:",
                        error
                    );
                    // En caso de error, usa solo el usuario de Firebase Auth
                    setUser(firebaseUser);
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    /**
     * Cierra la sesión del usuario actual.
     *
     * @returns {Promise<void>}
     */
    const logout = () => signOut(auth);

    return (
        <AuthContext.Provider value={{ user, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

/**
 * Hook personalizado para acceder al contexto de autenticación.
 *
 * @returns {{
 *  user: Object|null,
 *  loading: boolean,
 *  logout: Function
 * }}
 */
export const useAuth = () => useContext(AuthContext);
