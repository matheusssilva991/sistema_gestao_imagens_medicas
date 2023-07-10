const databaseSchema = require("../models/Database");
const mongoose = require("mongoose");

const DatabaseModel = mongoose.model('Database', databaseSchema)

class Database {
    async create (name, examType, description, imageQuality, imageType, sourceLink){
        const database = new DatabaseModel({ "name": name.toLowerCase(), examType, description, imageQuality, imageType, sourceLink })

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

    async databaseExists(name) {
        const database = await this.find({ "name": { $regex: new RegExp('^' + name + '$', 'i') } });

        if (database.length === 0)
            return false;
        return true;
    }
}

module.exports = new Database();
