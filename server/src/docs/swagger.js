const swaggerJSDoc = require("swagger-jsdoc");

/**
 * @swagger
 * components:
 *   schemas:
 *     World:
 *       type: object
 *       required: [id, name, description]
 *       properties:
 *         id:
 *           type: string
 *           example: eldoria
 *         name:
 *           type: string
 *           example: Eldoria
 *         description:
 *           type: string
 *           example: Mundo antiguo lleno de magia y reinos en guerra
 *         era:
 *           type: string
 *           example: Era del Cristal
 *
 *     Class:
 *       type: object
 *       required: [id, name, worldId]
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
 *           example: Guerreros entrenados desde la infancia
 *         worldId:
 *           type: string
 *           example: eldoria
 *
 *     Race:
 *       type: object
 *       required: [id, name, worldId]
 *       properties:
 *         id:
 *           type: string
 *           example: elf
 *         name:
 *           type: string
 *           example: Elfo
 *         description:
 *           type: string
 *           example: Seres longevos conectados con la magia
 *         traits:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Visión nocturna", "Afinidad mágica"]
 *         worldId:
 *           type: string
 *           example: eldoria
 *
 *     Zone:
 *       type: object
 *       required: [id, name, worldId]
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
 *           example: Bosque plagado de criaturas hostiles
 *         worldId:
 *           type: string
 *           example: eldoria
 */
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Questly Lore API",
            version: "1.0.0",
            description:
                "API para gestionar la información de Questly como zonas, clases, razas que se encuentran en mundos de fantasía.",
        },
        servers: [
            {
                url: "https://questly-back.vercel.app/api/v1",
                description: "Despliegue",
            },
            {
                url: "http://localhost:3001/api/v1",
                description: "Servidor local",
            },
        ],
    },
    apis: ["./src/routes/*.js", "./src/models/*.js", "./src/controllers/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
