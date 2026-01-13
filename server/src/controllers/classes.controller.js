const Class = require("../models/class.model");
const World = require("../models/world.model");

/**
 * @swagger
 * /classes:
 *   get:
 *     summary: Obtener clases (opcionalmente filtradas por mundo)
 *     tags: [Classes]
 *     parameters:
 *       - in: query
 *         name: worldId
 *         required: false
 *         schema:
 *           type: string
 *         description: ID del mundo
 *     responses:
 *       200:
 *         description: Lista de clases
 *       404:
 *         description: El mundo no existe
 */
const getAllClasses = async (req, res) => {
    try {
        const { worldId } = req.query;

        if (worldId) {
            // Verificar que el mundo exista
            const worldExists = await World.findOne({ id: worldId });
            if (!worldExists) {
                return res
                    .status(404)
                    .json({ ok: false, message: "El mundo no existe" });
            }
        }

        const filter = worldId ? { worldId } : {};
        const classes = await Class.find(filter);

        res.status(200).json({
            ok: true,
            message: "Lista de clases",
            data: classes,
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            message: "Error al obtener las clases",
        });
    }
};

/**
 * @swagger
 * /classes/{id}:
 *   get:
 *     summary: Obtener clase por ID
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Clase encontrada
 *       404:
 *         description: Clase no encontrada
 */
const getClassById = async (req, res) => {
    try {
        const cl = await Class.findOne({ id: req.params.id });
        if (!cl)
            return res
                .status(404)
                .json({ ok: false, message: "Clase no encontrada" });

        res.status(200).json({ ok: true, data: cl });
    } catch (err) {
        res.status(500).json({
            ok: false,
            message: "Error al obtener la clase",
        });
    }
};

/**
 * @swagger
 * /classes:
 *   post:
 *     summary: Crear una clase
 *     tags: [Classes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Class'
 *     responses:
 *       201:
 *         description: Clase creada
 *       400:
 *         description: Campos obligatorios faltantes
 */
const createClass = async (req, res) => {
    try {
        const { id, name, role, lore, worldId } = req.body;
        if (!worldId || !id || !name)
            return res.status(400).json({
                ok: false,
                message: "id, name y worldId son obligatorios",
            });

        const cl = new Class({ id, name, role, lore, worldId });
        await cl.save();
        res.status(201).json({ ok: true, message: "Clase creada", data: cl });
    } catch (err) {
        res.status(500).json({
            ok: false,
            message: "Error al crear la clase",
        });
    }
};

/**
 * @swagger
 * /classes/{id}:
 *   put:
 *     summary: Actualizar una clase
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Clase actualizada
 *       404:
 *         description: Clase no encontrada
 */
const updateClass = async (req, res) => {
    try {
        const cl = await Class.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true }
        );

        if (!cl)
            return res
                .status(404)
                .json({ ok: false, message: "Clase no encontrada" });

        res.status(200).json({
            ok: true,
            message: "Clase actualizada",
            data: cl,
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            message: "Error al actualizar la clase",
        });
    }
};

/**
 * @swagger
 * /classes/{id}:
 *   delete:
 *     summary: Eliminar una clase
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Clase eliminada
 *       404:
 *         description: Clase no encontrada
 */
const deleteClass = async (req, res) => {
    try {
        const cl = await Class.findOneAndDelete({ id: req.params.id });
        if (!cl)
            return res
                .status(404)
                .json({ ok: false, message: "Clase no encontrada" });

        res.status(200).json({
            ok: true,
            message: "Clase eliminada",
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            message: "Error al eliminar la clase",
        });
    }
};

module.exports = {
    getAllClasses,
    getClassById,
    createClass,
    updateClass,
    deleteClass,
};
