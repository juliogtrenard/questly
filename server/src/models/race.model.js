const { Schema, model } = require("mongoose");

/**
 * @swagger
 * components:
 *   schemas:
 *     Race:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - worldId
 *       properties:
 *         id:
 *           type: string
 *           example: elf
 *         name:
 *           type: string
 *           example: Elfo
 *         description:
 *           type: string
 *           example: Seres longevos ligados a la naturaleza
 *         traits:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Visión nocturna", "Afinidad mágica"]
 *         worldId:
 *           type: string
 *           example: eldoria
 */
const raceSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: String,
    traits: [String],
    worldId: {
        type: String,
        required: true,
    },
});

module.exports = model("Race", raceSchema);
