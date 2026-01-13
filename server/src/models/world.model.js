const { Schema, model } = require("mongoose");

/**
 * @swagger
 * components:
 *   schemas:
 *     World:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - description
 *       properties:
 *         id:
 *           type: string
 *           example: eldoria
 *         name:
 *           type: string
 *           example: Eldoria
 *         description:
 *           type: string
 *           example: Un antiguo mundo de magia y reinos olvidados
 *         era:
 *           type: string
 *           example: Era de los Tres Soles
 */
const worldSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    era: {
        type: String,
    },
});

module.exports = model("World", worldSchema);
