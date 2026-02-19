export const validateClass = ({ name, description }) => {
    if (!name.trim() || !description.trim()) {
        return "Nombre y descripción son obligatorios";
    }

    const classNameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s-]+$/;
    const descriptionRegex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s.,;:()'"¡!¿?-]+$/;

    if (!classNameRegex.test(name)) {
        return "El nombre contiene caracteres inválidos";
    }

    if (!descriptionRegex.test(description)) {
        return "La descripción contiene caracteres inválidos";
    }

    return null;
};
