import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "./firebaseConfig";

/**
 * Aplicación secundaria de Firebase
 * Usada solo para crear usuarios sin afectar la sesión actual
 */
const adminApp = initializeApp(firebaseConfig, "adminApp");

/**
 * Auth secundaria para el panel de admin
 */
export const adminAuth = getAuth(adminApp);
