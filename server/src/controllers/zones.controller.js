const Zone = require("../models/zone.model");
const World = require("../models/world.model");

/**
 * Obtener todas las zonas. Puedes filtrar por mundo.
 */
const getAllZones = async (req, res) => {
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
        const zones = await Zone.find(filter);

        res.status(200).json({
            ok: true,
            message: "Lista de zonas",
            data: zones,
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            message: "Error al obtener las zonas",
        });
    }
};

/**
 * Obtener zona por ID
 */
const getZoneById = async (req, res) => {
    try {
        const zone = await Zone.findOne({ id: req.params.id });
        if (!zone)
            return res
                .status(404)
                .json({ ok: false, message: "Zona no encontrada" });
        res.status(200).json({ ok: true, data: zone });
    } catch (err) {
        res.status(500).json({
            ok: false,
            message: "Error al obtener la zona",
        });
    }
};

/**
 * Crear zona
 */
const createZone = async (req, res) => {
    try {
        const { id, name, dangerLevel, description, worldId } = req.body;
        if (!id || !name || !worldId)
            return res.status(400).json({
                ok: false,
                message: "id, name y worldId son obligatorios",
            });

        const zone = new Zone({ id, name, dangerLevel, description, worldId });
        await zone.save();
        res.status(201).json({ ok: true, message: "Zona creada", data: zone });
    } catch (err) {
        res.status(500).json({ ok: false, message: "Error al crear la zona" });
    }
};

/**
 * Actualizar zona
 */
const updateZone = async (req, res) => {
    try {
        const zone = await Zone.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true }
        );
        if (!zone)
            return res
                .status(404)
                .json({ ok: false, message: "Zona no encontrada" });
        res.status(200).json({
            ok: true,
            message: "Zona actualizada",
            data: zone,
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            message: "Error al actualizar la zona",
        });
    }
};

/**
 * Eliminar zona
 */
const deleteZone = async (req, res) => {
    try {
        const zone = await Zone.findOneAndDelete({ id: req.params.id });
        if (!zone)
            return res
                .status(404)
                .json({ ok: false, message: "Zona no encontrada" });
        res.status(200).json({ ok: true, message: "Zona eliminada" });
    } catch (err) {
        res.status(500).json({
            ok: false,
            message: "Error al eliminar la zona",
        });
    }
};

module.exports = {
    getAllZones,
    getZoneById,
    createZone,
    updateZone,
    deleteZone,
};
