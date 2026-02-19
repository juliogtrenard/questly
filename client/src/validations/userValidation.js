export const validateUser = ({ username, email, password, isEdit }) => {
    if (!username?.trim()) {
        return "El nombre de usuario es obligatorio";
    }

    const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_]{2,19}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!usernameRegex.test(username)) {
        return "El usuario debe empezar por letra y solo usar letras, números o _";
    }

    if (!isEdit) {
        if (!email || !password) {
            return "Email y contraseña son obligatorios";
        }

        if (!emailRegex.test(email)) {
            return "El email no tiene un formato válido";
        }

        if (password.length < 6) {
            return "La contraseña debe tener al menos 6 caracteres";
        }
    }

    return null;
};
