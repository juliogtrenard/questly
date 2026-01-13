const { Schema, model } = require("mongoose");

const classSchema = new Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    role: String,
    lore: String,
    worldId: {
        type: String,
        required: true,
    },
});

module.exports = model("Class", classSchema);
