const mongoose = require("mongoose");
const connection = require("../database/Connection");

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

const ImageTypeModel = mongoose.model("ImageType", imageTypeSchema);

class ImageType {
    async create(name, description, requiredData, optionalData = {}) {
        let imageType;
        
        if (optionalData === {} || optionalData === undefined || optionalData === "" )
            imageType = new ImageTypeModel({ name, description, requiredData });
        else 
            imageType = new ImageTypeModel({ name, description, requiredData, optionalData });
    
        try {
            await imageType.save();
            return { sucess: true };

        } catch (err) {
            return { sucess: true, err };
        }
    }

    async find(queryParams={}){
        try {
            const imageTypes = await ImageTypeModel.find(queryParams);
            return imageTypes

        } catch (err) {
            return { sucess: false, err };
        }
    }

    async update(id, name, description, requiredData, optionalData={}) {
        let data = { name, description, requiredData, optionalData }

        if (optionalData={} || optionalData === "")
            delete data['optionalData'];

        try {
            await ImageTypeModel.findByIdAndUpdate(id, data, { new: true, runValidators: true });
            return;

        } catch (err) {
            return { sucess: false, err };
        } 
    }

    async delete (id) {
        try {
            await ImageTypeModel.findByIdAndRemove(id);
            return;

        } catch (err) {
            return { sucess: false, err };
        }
    }

    async imageTypeExists (name) {
        try {
            const re = new RegExp(name, "i");

            const imageType = await ImageTypeModel.find({ "name": re });

            if (imageType.length === 0){
                return false
            }

            return true

        } catch (err) {
            return { sucess: false, err };
        }
    }

}

module.exports = new ImageType();
