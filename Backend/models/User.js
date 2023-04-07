const mongoose = require("mongoose");
const connection = require("../database/Connection");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    institution: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    lattes: {
        type: String,
        required: false
    },
    role: {
        type: Number,
        required: true
    }
})

const UserModel = mongoose.model('User', userSchema)

class User {
    
    async create (name, email, password, institution, country, city, lattes, role) {
        let user;

        if (lattes) 
            user = new UserModel({name, email, password, institution, country, city, lattes, role})
        else 
            user = new UserModel({name, email, password, institution, country, city, role})
            
        try {
            await user.save();
            return { sucess: true };

        } catch (err) {
            return { sucess: false, err };
        }
    }

    async update(id, name, email, password, institution, country, city, lattes, role) {

        let data = { name, email, password, institution, country, city, lattes, role }
        
        if (!lattes)
            delete data.lattes;

        try {
            await UserModel.findByIdAndUpdate(id, data, { new: true, runValidators: true });
            return;
        } catch (err) {
            return { sucess: false, err };
        }   
    }

    async find (queryParams={}){
        try {
            const users = await UserModel.find(queryParams);
            return users

        } catch (err) {
            return { sucess: false, err };
        }
    }

    async delete (id) {
        try {
            await UserModel.findByIdAndRemove(id);
            return;
            
        } catch (err) {
            return { sucess: false, err };
        }
    }

    async emailExists (email) {
        try {
            const re = new RegExp(email, "i");
            const user = await UserModel.find({ "email": re });

            if (user.length == 0)
                return false

            return true

        } catch (err) {
            return { sucess: false, err };
        }
    }
}

module.exports = new User()
