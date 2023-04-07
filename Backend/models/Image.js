const mongoose = require("mongoose");
const connection = require("../database/Connection");

const imageSchema = new mongoose.Schema({
    sourceDatabase: {
        type: String,
        required: true
    },
    patient: {
        type: Object,
        required: true
    },
    imagePath: {
        type: String,
        required: true
    },
    imageDimension: {
        type: String,
        required: true
    },
    imageQuality: {
        type: String,
        required: true
    },
    classification: {
        type: Object,
        required: true
    },
    processing: {
        type: Array,
        required: false
    }
});

const ImageModel = mongoose.model("Image", imageSchema);

class Image {
    async find(queryParams={}){
        try {
            const images = await ImageModel.find(queryParams);
        
            return images
        } catch (err) {
            return { sucess: false, err };
        }
    }
}

module.exports = new Image();
