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
 * @swagger
 * /classes:
 *   get:
 *     summary: Obtener clases
 *     description: Devuelve todas las clases. Puede filtrarse por mundo.
 *     parameters:
 *       - in: query
 *         name: worldId
 *         schema:
 *           type: string
 *         description: ID del mundo
 *     responses:
 *       200:
 *         description: Lista de clases
 *       404:
 *         description: El mundo no existe
 */
router.get("/", getAllClasses);

/**
 * @swagger
 * /classes/{id}:
 *   get:
 *     summary: Obtener clase por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Clase encontrada
 *       404:
 *         description: Clase no encontrada
 */
router.get("/:id", getClassById);

/**
 * @swagger
 * /classes:
 *   post:
 *     summary: Crear clase
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Class'
 *     responses:
 *       201:
 *         description: Clase creada
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
 * @swagger
 * /classes/{id}:
 *   put:
 *     summary: Actualizar clase
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Class'
 *     responses:
 *       200:
 *         description: Clase actualizada
 *       404:
 *         description: Clase no encontrada
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
 * @swagger
 * /classes/{id}:
 *   delete:
 *     summary: Eliminar clase
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Clase eliminada
 *       404:
 *         description: Clase no encontrada
 */
router.delete("/:id", deleteClass);

module.exports = router;
