const { Schema, model } = require("mongoose");

const worldSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    era: {
        type: String,
    },
});

module.exports = model("World", worldSchema);
