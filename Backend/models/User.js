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
    
    async create (name, email, password, institution, country, city, lattes, role){
        let user;

        try {
            if (lattes) 
                user = new UserModel({name, email, password, institution, country, city, lattes, role})
            else 
                user = new UserModel({name, email, password, institution, country, city, role})
            
            await user.save();

            return { sucess: true }

        } catch (err) {
            return { sucess: false, err: err.errors }
        }
    }

    async update(id, name, email, password, institution, country, city, lattes, role){
        try {
            let user;
            let data = { name, email, password, institution, country, city, lattes, role }

            if (!lattes)
                delete data.lattes;

            user = await UserModel.findByIdAndUpdate(id, data, {
                new: true,                       // retorne o doc atualizado
                runValidators: true              // valida antes de atualizar
            });
        
            return user

        } catch (err) {
            return { err };
        }   
    }

    async find (queryParams={}){
        try {
            const users = await UserModel.find(queryParams);
        
            return users
        } catch (err) {
            return { err };
        }
    }

    async delete (id) {
        try {
            const user = await UserModel.findByIdAndRemove(id);

            return user
        } catch (err) {
            return { err };
        }
    }

    async emailExists (email) {
        try {
            const user = await UserModel.find({ email });

            if (user.length == 0)
                return false

            return true

        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = new User()
