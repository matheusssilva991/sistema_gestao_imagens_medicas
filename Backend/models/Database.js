const mongoose = require("mongoose");

const databaseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    examType: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageQuality: {
        type: Array,
        required: true
    },
    imageType: {
        type: String,
        required: true
    },
    sourceLink: {
        type: String,
        required: true
    },
    images: {
        type: Array,
        default: []
    }  
})

module.exports = databaseSchema;
