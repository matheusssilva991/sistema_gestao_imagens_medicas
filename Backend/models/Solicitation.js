const mongoose = require("mongoose");

const solicitationSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    solicitationDate: {
        type: Date,
        default: Date.now()
    },
    data: {
        type: Object,
        required: true
    }
})

module.exports = solicitationSchema;
