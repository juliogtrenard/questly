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
 * @route GET /worlds
 * @desc Obtener todos los mundos
 */
router.get("/", getAllWorlds);

/**
 * @route GET /worlds/:id
 * @desc Obtener mundo por id
 */
router.get("/:id", getWorldById);

/**
 * @route POST /worlds
 * @desc Crear nuevo mundo
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
 * @route PUT /worlds/:id
 * @desc Actualizar mundo
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
 * @route DELETE /worlds/:id
 * @desc Eliminar mundo
 */
router.delete("/:id", deleteWorld);

module.exports = router;
