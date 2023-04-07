const connection = require("../database/Connection");
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
    }
    
})

const DatabaseModel = mongoose.model('Database', databaseSchema)

class Database {
    async create (name, examType, description, imageQuality, imageType, sourceLink){
        const database = new DatabaseModel({ name, examType, description, imageQuality, imageType, sourceLink })

        try {
            await database.save();
            return { sucess: true };

        } catch (err) {
            return { sucess: false, err };
        }
    }

    async update(id, name, examType, description, imageQuality, imageType, sourceLink){
        const data = { name, examType, description, imageQuality, imageType, sourceLink }

        try {
            await DatabaseModel.findByIdAndUpdate(id, data, { new: true, runValidators: true });
            return;

        } catch (err) {
            return { sucess: false, err };
        }   
    }

    async find(queryParams={}) {
        try {
            const databases = await DatabaseModel.find(queryParams);
        
            return databases
        } catch (err) {
            return { sucess: false, err };
        }
    }

    async delete (id) {
        try {
            await DatabaseModel.findByIdAndRemove(id);
            return;

        } catch (err) {
            return { sucess: false, err };
        }
    }

    async databaseExists (name) {
        try {
            const re = new RegExp(name, "i");
            const database = await DatabaseModel.find({ "name": re });

            if (database.length === 0){
                return false
            }

            return true

        } catch (err) {
            return { sucess: false, err };
        }
    }
}

module.exports = new Database();
