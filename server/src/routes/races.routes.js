const express = require("express");
const router = express.Router();
const {
    getAllRaces,
    getRaceById,
    createRace,
    updateRace,
    deleteRace,
} = require("../controllers/races.controller");
const {
    validateId,
    validateRaceName,
    validateOptionalString,
    validateWorldId,
    validateTraits,
} = require("../utils/validaciones");
const {
    validateErrors,
    validateBody,
} = require("../middlewares/validar.middleware");

/**
 * @swagger
 * /races:
 *   get:
 *     summary: Obtener razas.
 *     description: Devuelve todas las razas. Puede filtrarse por mundo.
 *     parameters:
 *       - in: query
 *         name: worldId
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de razas
 */
router.get("/", getAllRaces);

/**
 * @swagger
 * /races/{id}:
 *   get:
 *     summary: Obtener raza por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 */
router.get("/:id", getRaceById);

/**
 * @swagger
 * /races:
 *   post:
 *     summary: Crear raza
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Race'
 */
router.post(
    "/",
    [
        validateBody,
        validateId,
        validateRaceName,
        validateOptionalString("description", 1000),
        validateTraits,
        validateWorldId,
        validateErrors,
    ],
    createRace
);

/**
 * @swagger
 * /races/{id}:
 *   put:
 *     summary: Actualizar raza
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Race'
 *     responses:
 *       200:
 *         description: Raza actualizada
 *       404:
 *         description: Raza no encontrada
 */
router.put(
    "/:id",
    [
        validateBody,
        validateId.optional(),
        validateRaceName.optional(),
        validateOptionalString("description", 1000),
        validateTraits.optional(),
        validateWorldId.optional(),
        validateErrors,
    ],
    updateRace
);

/**
 * @swagger
 * /races/{id}:
 *   delete:
 *     summary: Eliminar raza
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Raza eliminada
 *       404:
 *         description: Raza no encontrada
 */
router.delete("/:id", deleteRace);

module.exports = router;
