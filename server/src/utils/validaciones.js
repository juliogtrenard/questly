const { check } = require("express-validator");
const Class = require("../models/class.model");
const Race = require("../models/race.model");
const World = require("../models/world.model");
const Zone = require("../models/zone.model");

const validateOptionalString = (field, max = 255) =>
    check(field)
        .optional()
        .isString()
        .withMessage(`${field} debe ser un string.`)
        .bail()
        .isLength({ max })
        .withMessage(`${field} no puede superar ${max} caracteres.`);

/**
 * @description Valida si una clase con el mismo nombre ya existe
 * @param {string} name - El nombre a validar
 * @returns {boolean} - True si no existe
 * @throws {Error} - Si ya existe
 */
const classExists = async (name) => {
    const c = await Class.findOne({ name });
    if (c) {
        throw new Error("Ya existe una clase con ese nombre");
    }
    return true;
};

/**
 * @description Valida si una raza con el mismo nombre ya existe
 * @param {string} name - El nombre a validar
 * @returns {boolean} - True si no existe
 * @throws {Error} - Si ya existe
 */
const raceExists = async (name) => {
    const r = await Race.findOne({ name });
    if (r) {
        throw new Error("Ya existe una raza con ese nombre");
    }
    return true;
};

/**
 * @description Valida si un mundo con el mismo nombre ya existe
 * @param {string} name - El nombre a validar
 * @returns {boolean} - True si no existe
 * @throws {Error} - Si ya existe
 */
const worldExists = async (name) => {
    const w = await World.findOne({ name });
    if (w) {
        throw new Error("Ya existe un mundo con ese nombre");
    }
    return true;
};

/**
 * @description Valida si una zona con el mismo nombre ya existe
 * @param {string} name - El nombre a validar
 * @returns {boolean} - True si no existe
 * @throws {Error} - Si ya existe
 */
const zoneExists = async (name) => {
    const z = await Zone.findOne({ name });
    if (z) {
        throw new Error("Ya existe una zona con ese nombre");
    }
    return true;
};

const validateClassName = check("name")
    .notEmpty()
    .withMessage("El campo no puede estar vacío.")
    .bail()
    .isString()
    .withMessage("El campo tiene que ser una cadena de texto.")
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage("Longitud entre 2 y 50")
    .bail()
    .custom(classExists);

const validateRaceName = check("name")
    .notEmpty()
    .withMessage("El campo no puede estar vacío.")
    .bail()
    .isString()
    .withMessage("El campo tiene que ser una cadena de texto.")
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage("Longitud entre 2 y 50")
    .bail()
    .custom(raceExists);

const validateWorldName = check("name")
    .notEmpty()
    .withMessage("El campo no puede estar vacío.")
    .bail()
    .isString()
    .withMessage("El campo tiene que ser una cadena de texto.")
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage("Longitud entre 2 y 50")
    .bail()
    .custom(worldExists);

const validateZoneName = check("name")
    .notEmpty()
    .withMessage("El campo no puede estar vacío.")
    .bail()
    .isString()
    .withMessage("El campo tiene que ser una cadena de texto.")
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage("Longitud entre 2 y 50")
    .bail()
    .custom(zoneExists);

const validateId = check("id")
    .notEmpty()
    .withMessage("El id es obligatorio.")
    .bail()
    .isString()
    .withMessage("El id debe ser un string.")
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage("El id debe tener entre 2 y 50 caracteres.");

const validateWorldId = check("worldId")
    .notEmpty()
    .withMessage("worldId es obligatorio.")
    .bail()
    .isString()
    .withMessage("worldId debe ser un string.");

const validateTraits = check("traits")
    .optional()
    .isArray()
    .withMessage("traits debe ser un array.")
    .bail();

const validateDanger = check("dangerLevel")
    .optional()
    .isInt({ min: 0, max: 10 })
    .withMessage("dangerLevel debe ser un número entre 0 y 10.");

module.exports = {
    validateId,
    validateWorldId,
    validateClassName,
    validateRaceName,
    validateWorldName,
    validateZoneName,
    validateOptionalString,
    classExists,
    raceExists,
    validateTraits,
    worldExists,
    zoneExists,
    validateDanger,
};
