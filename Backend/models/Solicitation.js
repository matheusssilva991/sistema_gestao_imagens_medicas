const mongoose = require("mongoose");
const connection = require("../database/Connection");

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

const SolicitationModel = mongoose.model('Solicitation', solicitationSchema)

class Solicitation {
    
    async create (type, status, data){
        let solicitation;

        try {
            solicitation = new SolicitationModel({type, status, data})
            
            await solicitation.save();

            return { sucess: true }

        } catch (err) {
            return { sucess: false, err: err }
        }
    }

    async update(id, status){
        try {
            let solicitation;
            let data = { status }

            solicitation = await SolicitationModel.findByIdAndUpdate(id, data, {
                new: true,                       // retorne o doc atualizado
                runValidators: true              // valida antes de atualizar
            });
        
            return { sucess: true };

        } catch (err) {
            return { sucess: false, err: err };
        }   
    }

    async find (queryParams={}){
        try {
            const solicitations = await SolicitationModel.find(queryParams);
        
            return solicitations;

        } catch (err) {
            return { sucess: false, err: err };
        }
    }

    async delete (id) {
        try {
            const solicitation = await SolicitationModel.findByIdAndRemove(id);

            return { sucess: true };

        } catch (err) {
            return { sucess: false, err: err };
        }
    }

    async solicitationDatabaseExists (name) {
        try {
            const solicitation = await SolicitationModel.find(
                { "data.name": name, status: {$in: ["pending", "progress"]} 
            });

            if (solicitation.length === 0){
                return false
            }

            return true

        } catch (err) {
            return { sucess: false, err: err };
        }
    }

    async solicitationEmailExists (email) {
        try {
            const solicitation = await SolicitationModel.find({ 
                "data.email": email, status: {$in: ["pending", "progress"]} 
            });

            if (solicitation.length === 0){
                return false
            }

            return true

        } catch (err) {
            return { sucess: false, err: err };
        }
    }
}

module.exports = new Solicitation()
