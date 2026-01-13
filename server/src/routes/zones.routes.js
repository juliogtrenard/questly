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
 * @route GET /zones
 * @desc Obtener todas las zonas de un mundo (query: worldId)
 */
router.get("/", getAllZones);

/**
 * @route GET /zones/:id
 * @desc Obtener zona por id
 */
router.get("/:id", getZoneById);

/**
 * @route POST /zones
 * @desc Crear nueva zona
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
 * @route PUT /zones/:id
 * @desc Actualizar zona
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
 * @route DELETE /zones/:id
 * @desc Eliminar zona
 */
router.delete("/:id", deleteZone);

module.exports = router;
