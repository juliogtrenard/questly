export const validateCharacter = ({ name, selectedClass }) => {
    if (!name?.trim()) {
        return "El nombre es obligatorio";
    }

    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s'-]+$/;

    if (!nameRegex.test(name)) {
        return "El nombre contiene caracteres inválidos";
    }

    if (!selectedClass) {
        return "Debes seleccionar una clase";
    }

    return null;
};
