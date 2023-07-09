const mongoose = require("mongoose");

const imageTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    requiredData: {
        type: Array,
        required: true
    },
    optionalData: {
        type: Array,
        required: false
    }
});

module.exports = imageTypeSchema;
