const Race = require("../models/race.model");
const World = require("../models/world.model");

/**
 * @swagger
 * /races:
 *   get:
 *     summary: Obtener razas (opcionalmente filtradas por mundo)
 *     tags: [Races]
 *     parameters:
 *       - in: query
 *         name: worldId
 *         required: false
 *         schema:
 *           type: string
 *         description: ID del mundo
 *     responses:
 *       200:
 *         description: Lista de razas
 *       404:
 *         description: El mundo no existe
 */
const getAllRaces = async (req, res) => {
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
        const races = await Race.find(filter);

        res.status(200).json({
            ok: true,
            message: "Lista de razas",
            data: races,
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            message: "Error al obtener las razas",
        });
    }
};

/**
 * @swagger
 * /races/{id}:
 *   get:
 *     summary: Obtener raza por ID
 *     tags: [Races]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Raza encontrada
 *       404:
 *         description: Raza no encontrada
 */
const getRaceById = async (req, res) => {
    try {
        const race = await Race.findOne({ id: req.params.id });
        if (!race)
            return res
                .status(404)
                .json({ ok: false, message: "Raza no encontrada" });

        res.status(200).json({ ok: true, data: race });
    } catch (err) {
        res.status(500).json({
            ok: false,
            message: "Error al obtener la raza",
        });
    }
};

/**
 * @swagger
 * /races:
 *   post:
 *     summary: Crear una raza
 *     tags: [Races]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Race'
 *     responses:
 *       201:
 *         description: Raza creada
 *       400:
 *         description: Campos obligatorios faltantes
 */
const createRace = async (req, res) => {
    try {
        const { id, name, description, traits, worldId } = req.body;
        if (!id || !name || !worldId)
            return res.status(400).json({
                ok: false,
                message: "id, name y worldId son obligatorios",
            });

        const race = new Race({ id, name, description, traits, worldId });
        await race.save();
        res.status(201).json({ ok: true, message: "Raza creada", data: race });
    } catch (err) {
        res.status(500).json({ ok: false, message: "Error al crear la raza" });
    }
};

/**
 * @swagger
 * /races/{id}:
 *   put:
 *     summary: Actualizar una raza
 *     tags: [Races]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Raza actualizada
 *       404:
 *         description: Raza no encontrada
 */
const updateRace = async (req, res) => {
    try {
        const race = await Race.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true }
        );
        if (!race)
            return res
                .status(404)
                .json({ ok: false, message: "Raza no encontrada" });
        res.status(200).json({
            ok: true,
            message: "Raza actualizada",
            data: race,
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            message: "Error al actualizar la raza",
        });
    }
};

/**
 * @swagger
 * /races/{id}:
 *   delete:
 *     summary: Eliminar una raza
 *     tags: [Races]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Raza eliminada
 *       404:
 *         description: Raza no encontrada
 */
const deleteRace = async (req, res) => {
    try {
        const race = await Race.findOneAndDelete({ id: req.params.id });
        if (!race)
            return res
                .status(404)
                .json({ ok: false, message: "Raza no encontrada" });
        res.status(200).json({
            ok: true,
            message: "Raza eliminada",
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            message: "Error al eliminar la raza",
        });
    }
};

module.exports = {
    getAllRaces,
    getRaceById,
    createRace,
    updateRace,
    deleteRace,
};
