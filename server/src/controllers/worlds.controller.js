const World = require("../models/world.model");

/**
 * Obtener todos los mundos
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
 * Obtener un mundo por su id
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
 * Crear un nuevo mundo
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
 * Actualizar un mundo por id
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
 * Eliminar un mundo por id
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
