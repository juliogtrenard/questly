import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

/**
 * Configuración de Firebase.
 *
 * Las credenciales se obtienen desde variables de entorno.
 *
 * @type {Object}
 */
export const firebaseConfig = {
    /** Clave pública de la API de Firebase */
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,

    /** Dominio de autenticación del proyecto */
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,

    /** ID del proyecto de Firebase */
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,

    /** Bucket de Firebase Storage */
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,

    /** ID del sender para Firebase Cloud Messaging */
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,

    /** ID de la aplicación Firebase */
    appId: import.meta.env.VITE_FIREBASE_APP_ID,

    /** ID de medición (Google Analytics) */
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

/**
 * Inicializa la aplicación de Firebase.
 *
 * Esta instancia es el núcleo de Firebase y se reutiliza
 * para todos los servicios (Auth, Firestore, Storage, etc).
 *
 * @type {import("firebase/app").FirebaseApp}
 */
const app = initializeApp(firebaseConfig);

/**
 * Instancia de Firebase Authentication.
 *
 * Se utiliza para:
 * - Registro de usuarios
 * - Login
 * - Logout
 * - Manejo de sesión
 *
 * @type {import("firebase/auth").Auth}
 */
export const auth = getAuth(app);

/**
 * Instancia de Cloud Firestore.
 *
 * Se utiliza para:
 * - Guardar perfiles de usuario
 * - Roles
 *
 * @type {import("firebase/firestore").Firestore}
 */
export const db = getFirestore(app);
