const express = require("express");
const {
    getAllWorlds,
    getWorldById,
    createWorld,
    updateWorld,
    deleteWorld,
} = require("../controllers/worlds.controller");
const {
    validateId,
    validateWorldName,
    validateOptionalString,
} = require("../utils/validaciones");
const {
    validateErrors,
    validateBody,
} = require("../middlewares/validar.middleware");

const router = express.Router();

/**
 * @swagger
 * /worlds:
 *   get:
 *     summary: Obtener mundos
 *     responses:
 *       200:
 *         description: Lista de mundos
 */
router.get("/", getAllWorlds);

/**
 * @swagger
 * /worlds/{id}:
 *   get:
 *     summary: Obtener mundo por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 */
router.get("/:id", getWorldById);

/**
 * @swagger
 * /worlds:
 *   post:
 *     summary: Crear mundo
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/World'
 */
router.post(
    "/",
    [
        validateBody,
        validateId,
        validateWorldName,
        validateOptionalString("era", 100),
        validateErrors,
    ],
    createWorld
);

/**
 * @swagger
 * /worlds/{id}:
 *   put:
 *     summary: Actualizar mundo
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/World'
 *     responses:
 *       200:
 *         description: Mundo actualizada
 *       404:
 *         description: Mundo no encontrada
 */
router.put(
    "/:id",
    [
        validateBody,
        validateId.optional(),
        validateWorldName.optional(),
        validateOptionalString("era", 100),
        validateErrors,
    ],
    updateWorld
);

/**
 * @swagger
 * /worlds/{id}:
 *   delete:
 *     summary: Eliminar mundo
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Mundo eliminado
 *       404:
 *         description: Mundo no encontrado
 */
router.delete("/:id", deleteWorld);

module.exports = router;
