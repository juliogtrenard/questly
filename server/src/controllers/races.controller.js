const Race = require("../models/race.model");
const World = require("../models/world.model");

/**
 * Obtener todas las razas. Puedes filtrar por mundo.
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
 * Obtener una raza por ID
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
 * Crear nueva raza
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
 * Actualizar raza
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
 * Eliminar raza
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
