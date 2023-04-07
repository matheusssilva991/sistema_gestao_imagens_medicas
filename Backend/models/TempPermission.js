const connection = require("../database/Connection");
const mongoose = require("mongoose");

const tempPermissionSchema = new mongoose.Schema({
    userId: {
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
    async create (userId){
        const tempPermission = new TempPermissionModel({userId, used: false});

        try {
            await tempPermission.save();
            return { sucess: true };

        } catch (err) {
            return { sucess: false, err };
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
            await TempPermissionModel.findByIdAndUpdate(id, { used }, { runValidators: true });
            return;

        } catch (err) {
            return { sucess: false, err };
        }
    }

    async delete (id) {
        try {
            await TempPermissionModel.findByIdAndRemove(id);
            return;

        } catch (err) {
            return { sucess: false, err };
        }
    }
}

module.exports = new TempPermission();
