const connection = require("../database/Connection");
const mongoose = require("mongoose");

const tempPermissionSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    solicitationId: {
        type: String,
        required: true
    },
    used: {
        type: Boolean,
        required: true
    }
});

const TempPermissionModel = mongoose.model("TempPermission", tempPermissionSchema);

class TempPermission {
    async create (userId, solicitationId){
        let tempPermission;

        try {
            tempPermission = new TempPermissionModel({userId, solicitationId, used: false});

            await tempPermission.save();

            return { sucess: true };
        } catch (err) {
            return { sucess: false, err: err };
        }
    }
    
    async find (queryParams) {
        try {
            const tempPermission = await TempPermissionModel.find(queryParams);
        
            return tempPermission;
        } catch (err) {
            return { sucess: false, err };
        }
    }


    async update (id, used) {
        try {
            let data = { used }

            const _ = await TempPermissionModel.findByIdAndUpdate(id, data, {
                new: true,                       // retorne o doc atualizado
                runValidators: true              // valida antes de atualizar);
            });

            return { sucess: true };

        } catch (err) {
            return { sucess: false, err: err };
        }
    }

    async delete (id) {
        try {
            const _ = await TempPermissionModel.findByIdAndRemove(id);

            return { sucess: true };
        } catch (err) {
            return { sucess: false, err };
        }
    }
}

module.exports = new TempPermission();
