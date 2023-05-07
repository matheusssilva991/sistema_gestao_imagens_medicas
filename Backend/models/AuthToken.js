const connection = require("../databases/Connection");
const mongoose = require("mongoose");

const authTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        unique: true
    },
    expirationDate: {
      type: Date,
      expires: 3600, // o valor do tempo de vida será definido posteriormente
      default: Date.now,
    }
});

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
