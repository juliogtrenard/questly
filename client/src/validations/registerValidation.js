export const validateRegister = ({
    username,
    email,
    password,
    repeatPassword,
}) => {
    if (!username?.trim() || !email?.trim() || !password || !repeatPassword) {
        return "Todos los campos son obligatorios";
    }

    if (username.length < 2) {
        return "El username debe tener al menos 2 caracteres";
    }

    const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_]{1,19}$/;

    if (!usernameRegex.test(username)) {
        return "El username debe empezar por letra y solo usar letras, números o _";
    }

    if (password.length < 6) {
        return "La contraseña debe tener al menos 6 caracteres";
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).+$/;

    if (!passwordRegex.test(password)) {
        return "La contraseña debe tener al menos una mayúscula y un número";
    }

    if (password !== repeatPassword) {
        return "Las contraseñas no coinciden";
    }

    return null;
};
