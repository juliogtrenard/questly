const { Schema, model } = require("mongoose");

const raceSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: String,
    traits: [String],
    worldId: {
        type: String,
        required: true,
    },
});

module.exports = model("Race", raceSchema);
