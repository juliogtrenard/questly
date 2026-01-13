const Zone = require("../models/zone.model");
const World = require("../models/world.model");

/**
 * @swagger
 * /zones:
 *   get:
 *     summary: Obtener zonas (opcionalmente filtradas por mundo)
 *     tags: [Zones]
 *     parameters:
 *       - in: query
 *         name: worldId
 *         required: false
 *         schema:
 *           type: string
 *         description: ID del mundo
 *     responses:
 *       200:
 *         description: Lista de zonas
 *       404:
 *         description: El mundo no existe
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
 * @swagger
 * /zones/{id}:
 *   get:
 *     summary: Obtener zona por ID
 *     tags: [Zones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Zona encontrada
 *       404:
 *         description: Zona no encontrada
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
 * @swagger
 * /zones:
 *   post:
 *     summary: Crear una zona
 *     tags: [Zones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Zone'
 *     responses:
 *       201:
 *         description: Zona creada
 *       400:
 *         description: Campos obligatorios faltantes
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
 * @swagger
 * /zones/{id}:
 *   put:
 *     summary: Actualizar una zona
 *     tags: [Zones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Zona actualizada
 *       404:
 *         description: Zona no encontrada
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
 * @swagger
 * /zones/{id}:
 *   delete:
 *     summary: Eliminar una zona
 *     tags: [Zones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Zona eliminada
 *       404:
 *         description: Zona no encontrada
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
