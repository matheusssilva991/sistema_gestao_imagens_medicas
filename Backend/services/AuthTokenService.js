const authTokenSchema = require("../models/AuthToken");
const mongoose = require("mongoose");

const AuthTokenModel = mongoose.model('authToken', authTokenSchema);

class AuthToken {
    async create (token){
        const authToken = new AuthTokenModel({ "token": token });

        try {
            await authToken.save();
            return { sucess: true };

        } catch (err) {
            return { sucess: false, err };
        }
    }

    async find(token) {
        try {
            const authToken = await AuthTokenModel.find({ token });
        
            return authToken;
        } catch (err) {
            return { sucess: false, err };
        }
    }

    async delete (id) {
        try {
            await AuthTokenModel.findByIdAndRemove(id);
            return;

        } catch (err) {
            return { sucess: false, err };
        }
    }
}

module.exports = new AuthToken();
