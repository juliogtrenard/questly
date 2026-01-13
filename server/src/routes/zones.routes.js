const express = require("express");
const router = express.Router();
const {
    getAllZones,
    getZoneById,
    createZone,
    updateZone,
    deleteZone,
} = require("../controllers/zones.controller");
const {
    validateId,
    validateZoneName,
    validateOptionalString,
    validateDanger,
    validateWorldId,
} = require("../utils/validaciones");
const {
    validateErrors,
    validateBody,
} = require("../middlewares/validar.middleware");

/**
 * @swagger
 * /zones:
 *   get:
 *     summary: Obtener zonas.
 *     description: Devuelve todas las zonas. Puede filtrarse por mundo.
 *     parameters:
 *       - in: query
 *         name: worldId
 *         schema:
 *           type: string
 */
router.get("/", getAllZones);

/**
 * @swagger
 * /zones/{id}:
 *   get:
 *     summary: Obtener zona por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 */
router.get("/:id", getZoneById);

/**
 * @swagger
 * /zones:
 *   post:
 *     summary: Crear zona
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Zone'
 */
router.post(
    "/",
    [
        validateBody,
        validateId,
        validateZoneName,
        validateOptionalString("description", 1000),
        validateDanger,
        validateWorldId,
        validateErrors,
    ],
    createZone
);

/**
 * @swagger
 * /zones/{id}:
 *   put:
 *     summary: Actualizar zona
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Zone'
 *     responses:
 *       200:
 *         description: Zona actualizada
 *       404:
 *         description: Zona no encontrada
 */
router.put(
    "/:id",
    [
        validateBody,
        validateId.optional(),
        validateZoneName.optional(),
        validateDanger,
        validateWorldId.optional(),
        validateOptionalString("description", 1000),
        validateErrors,
    ],
    updateZone
);

/**
 * @swagger
 * /zones/{id}:
 *   delete:
 *     summary: Eliminar zona
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Zona eliminada
 *       404:
 *         description: Zona no encontrada
 */
router.delete("/:id", deleteZone);

module.exports = router;
