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
        let database;

        try {
            database = new DatabaseModel({ name, examType, description, imageQuality, imageType, sourceLink })
            
            await database.save();

            return { sucess: true }

        } catch (err) {
            return { sucess: false, err: err.errors }
        }
    }

    async update(id, name, examType, description, imageQuality, imageType, sourceLink){
        try {
            let database;
            let data = { name, examType, description, imageQuality, imageType, sourceLink }

            database = await DatabaseModel.findByIdAndUpdate(id, data, {
                new: true,                       // retorne o doc atualizado
                runValidators: true              // valida antes de atualizar
            });
        
            return database

        } catch (err) {
            return { err };
        }   
    }
}
