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
        type: Object,
        required: true
    },
    optionalData: {
        type: Object,
        required: false
    }
});

module.exports = imageTypeSchema;
