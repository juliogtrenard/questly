const { Schema, model } = require("mongoose");

/**
 * @swagger
 * components:
 *   schemas:
 *     Class:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - worldId
 *       properties:
 *         id:
 *           type: string
 *           example: warrior
 *         name:
 *           type: string
 *           example: Guerrero
 *         role:
 *           type: string
 *           example: Combatiente cuerpo a cuerpo
 *         lore:
 *           type: string
 *           example: Soldados entrenados desde la infancia
 *         worldId:
 *           type: string
 *           example: eldoria
 */
const classSchema = new Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    role: String,
    lore: String,
    worldId: {
        type: String,
        required: true,
    },
});

module.exports = model("Class", classSchema);
