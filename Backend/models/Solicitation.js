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
            return { sucess: false, err: err.errors }
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
        
            return solicitation

        } catch (err) {
            return { err };
        }   
    }

    async find (queryParams={}){
        try {
            const solicitations = await SolicitationModel.find(queryParams);
        
            return solicitations
        } catch (err) {
            return { err };
        }
    }

    async delete (id) {
        try {
            const solicitation = await SolicitationModel.findByIdAndRemove(id);

            return solicitation
        } catch (err) {
            return { err };
        }
    }

    async solicitationDatabaseExists (name) {
        try {
            const solicitation = await SolicitationModel.find({ "data.name": name });

            if (solicitation.length === 0){
                return false
            }

            return true

        } catch (err) {
            console.log(err);
        }
    }

    async solicitationEmailExists (email) {
        try {
            const solicitation = await SolicitationModel.find({ "data.email": email });

            if (solicitation.length === 0){
                return false
            }

            return true

        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = new Solicitation()
