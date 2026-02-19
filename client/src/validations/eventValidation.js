export const validateEvent = ({ id, title, text, options }) => {
    if (!id?.trim() || !title?.trim() || !text?.trim()) {
        return "ID, título y texto son obligatorios";
    }

    const eventIdRegex = /^[a-z][a-z0-9_]*$/;
    const textRegex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s.,:;!?()'"-]+$/;

    if (!eventIdRegex.test(id)) {
        return "El ID debe empezar por letra y solo contener letras minúsculas, números y _";
    }

    if (!textRegex.test(title)) {
        return "El título contiene caracteres inválidos";
    }

    if (!textRegex.test(text)) {
        return "El texto del evento contiene caracteres inválidos";
    }

    for (let i = 0; i < options.length; i++) {
        const opt = options[i];

        if (!opt.text?.trim()) {
            return `La opción ${i + 1} no puede estar vacía`;
        }

        if (!textRegex.test(opt.text)) {
            return `La opción ${i + 1} contiene caracteres inválidos`;
        }
    }

    return null;
};
