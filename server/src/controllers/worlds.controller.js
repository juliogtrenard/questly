const World = require("../models/world.model");

/**
 * @swagger
 * /worlds:
 *   get:
 *     summary: Obtener todos los mundos
 *     tags: [Worlds]
 *     responses:
 *       200:
 *         description: Lista de mundos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/World'
 *       500:
 *         description: Error interno
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
const getAllWorlds = async (req, res) => {
    try {
        const worlds = await World.find();
        res.status(200).json({
            ok: true,
            message: "Lista de mundos",
            data: worlds,
        });
    } catch (err) {
        res.status(500).json({ ok: false, message: "Error al obtener mundos" });
    }
};

/**
 * @swagger
 * /worlds/{id}:
 *   get:
 *     summary: Obtener un mundo por ID
 *     tags: [Worlds]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Mundo encontrado
 *       404:
 *         description: Mundo no encontrado
 *       500:
 *         description: Error interno
 */
const getWorldById = async (req, res) => {
    try {
        const world = await World.findOne({ id: req.params.id });
        if (!world)
            return res
                .status(404)
                .json({ ok: false, message: "Mundo no encontrado" });
        res.status(200).json({ ok: true, data: world });
    } catch (err) {
        res.status(500).json({
            ok: false,
            message: "Error al obtener el mundo",
        });
    }
};

/**
 * @swagger
 * /worlds:
 *   post:
 *     summary: Crear un nuevo mundo
 *     tags: [Worlds]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/World'
 *     responses:
 *       201:
 *         description: Mundo creado
 *       400:
 *         description: Datos obligatorios faltantes
 *       500:
 *         description: Error interno
 */
const createWorld = async (req, res) => {
    try {
        const { id, name, description, era } = req.body;

        if (!id || !name || !description)
            return res.status(400).json({
                ok: false,
                message: "id, name y description son obligatorios",
            });

        const newWorld = new World({ id, name, description, era });
        await newWorld.save();
        res.status(201).json({
            ok: true,
            message: "Mundo creado",
            data: newWorld,
        });
    } catch (err) {
        res.status(500).json({ ok: false, message: "Error al crear el mundo" });
    }
};

/**
 * @swagger
 * /worlds/{id}:
 *   put:
 *     summary: Actualizar un mundo
 *     tags: [Worlds]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Mundo actualizado
 *       404:
 *         description: Mundo no encontrado
 */
const updateWorld = async (req, res) => {
    try {
        const updated = await World.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true }
        );
        if (!updated)
            return res
                .status(404)
                .json({ ok: false, message: "Mundo no encontrado" });
        res.status(200).json({
            ok: true,
            message: "Mundo actualizado",
            data: updated,
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            message: "Error al actualizar el mundo",
        });
    }
};

/**
 * @swagger
 * /worlds/{id}:
 *   delete:
 *     summary: Eliminar un mundo
 *     tags: [Worlds]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Mundo eliminado
 *       404:
 *         description: Mundo no encontrado
 */
const deleteWorld = async (req, res) => {
    try {
        const deleted = await World.findOneAndDelete({ id: req.params.id });
        if (!deleted)
            return res
                .status(404)
                .json({ ok: false, message: "Mundo no encontrado" });
        res.status(200).json({
            ok: true,
            message: "Mundo eliminado",
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            message: "Error al eliminar el mundo",
        });
    }
};

module.exports = {
    getAllWorlds,
    getWorldById,
    createWorld,
    updateWorld,
    deleteWorld,
};
