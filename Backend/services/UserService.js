const userSchema = require("../models/User");
const mongoose = require("mongoose");

const UserModel = mongoose.model('User', userSchema)

class User {
    
    async create (name, email, password, institution, country, city, lattes, role=0) {
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

    async update(id, name, email, password, institution, country, city, lattes, role ) {

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
            const user = await UserModel.find({ email });

            if (user.length == 0)
                return false

            return true

        } catch (err) {
            return { sucess: false, err };
        }
    }
}

module.exports = new User()
