const express = require("express");
const router = express.Router();
const {
    getAllClasses,
    getClassById,
    createClass,
    updateClass,
    deleteClass,
} = require("../controllers/classes.controller");
const {
    validateClassName,
    validateId,
    validateOptionalString,
    validateWorldId,
} = require("../utils/validaciones");
const {
    validateErrors,
    validateBody,
} = require("../middlewares/validar.middleware");

/**
 * @route GET /classes
 * @desc Obtener todas las clases de un mundo (query: worldId)
 */
router.get("/", getAllClasses);

/**
 * @route GET /classes/:id
 * @desc Obtener clase por id
 */
router.get("/:id", getClassById);

/**
 * @route POST /classes
 * @desc Crear nueva clase
 */
router.post(
    "/",
    [
        validateBody,
        validateId,
        validateClassName,
        validateOptionalString("role", 100),
        validateOptionalString("lore", 1000),
        validateWorldId,
        validateErrors,
    ],
    createClass
);

/**
 * @route PUT /classes/:id
 * @desc Actualizar clase
 */
router.put(
    "/:id",
    [
        validateBody,
        validateId.optional(),
        validateClassName.optional(),
        validateOptionalString("role", 100),
        validateOptionalString("lore", 1000),
        validateWorldId.optional(),
        validateErrors,
    ],
    updateClass
);

/**
 * @route DELETE /classes/:id
 * @desc Eliminar clase
 */
router.delete("/:id", deleteClass);

module.exports = router;
