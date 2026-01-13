const { Schema, model } = require("mongoose");

const zoneSchema = new Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    dangerLevel: Number,
    description: String,
    worldId: {
        type: String,
        required: true,
    },
});

module.exports = model("Zone", zoneSchema);
