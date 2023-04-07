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
        const solicitation = new SolicitationModel({type, status, data});

        try {
            await solicitation.save();
            return { sucess: true }

        } catch (err) {
            return { sucess: false, err }
        }
    }

    async update(id, status){
        try {
            await SolicitationModel.findByIdAndUpdate(id, { status }, { runValidators: true });
            return;

        } catch (err) {
            return { sucess: false, err };
        }   
    }

    async find (queryParams={}){
        try {
            const solicitations = await SolicitationModel.find(queryParams);
            return solicitations;

        } catch (err) {
            return { sucess: false, err };
        }
    }

    async delete (id) {
        try {
            await SolicitationModel.findByIdAndRemove(id);
            return;

        } catch (err) {
            return { sucess: false, err };
        }
    }

    async solicitationDatabaseExists (name) {
        try {
            const re = new RegExp(name, "i");
            const solicitation = await SolicitationModel.find({ "data.name": re, status: "pending" });

            if (solicitation.length === 0){
                return false
            }

            return true

        } catch (err) {
            return { sucess: false, err };
        }
    }

    async solicitationEmailExists (email) {
        try {
            const re = new RegExp(email, "i");
            const solicitation = await SolicitationModel.find({ "data.email": re, status: "pending" });

            if (solicitation.length === 0){
                return false
            }

            return true

        } catch (err) {
            return { sucess: false, err };
        }
    }
}

module.exports = new Solicitation()
