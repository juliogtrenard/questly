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
 * @route GET /races
 * @desc Obtener todas las razas de un mundo (query: worldId)
 */
router.get("/", getAllRaces);

/**
 * @route GET /races/:id
 * @desc Obtener raza por id
 */
router.get("/:id", getRaceById);

/**
 * @route POST /races
 * @desc Crear nueva raza
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
 * @route PUT /races/:id
 * @desc Actualizar raza
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
 * @route DELETE /races/:id
 * @desc Eliminar raza
 */
router.delete("/:id", deleteRace);

module.exports = router;
