const { Schema, model } = require("mongoose");

/**
 * @swagger
 * components:
 *   schemas:
 *     Zone:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - worldId
 *       properties:
 *         id:
 *           type: string
 *           example: dark_forest
 *         name:
 *           type: string
 *           example: Bosque Oscuro
 *         dangerLevel:
 *           type: number
 *           example: 4
 *         description:
 *           type: string
 *           example: Un bosque plagado de criaturas hostiles
 *         worldId:
 *           type: string
 *           example: eldoria
 */
const zoneSchema = new Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    dangerLevel: Number,
    description: String,
    worldId: {
        type: String,
        required: true,
    },
});

module.exports = model("Zone", zoneSchema);
