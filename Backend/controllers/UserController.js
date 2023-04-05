const User = require("../models/User");
const bcrypt = require("bcrypt");
const validator = require("validator");

class UserController {
    async getUsers (req, res) {
        const users = await User.find();

        res.status(200).json(users);
        return
    }

    async getUser (req, res) {
        const id = req.params.id;
        const user = await User.find({_id: id});

        res.status(200).json(user[0]);
        return
    }

    async newUser (req, res) {
        const { name, email, password, institution, country, city, lattes } = req.body;

        if (await User.emailExists(email)) {
            res.status(403).json({ err: "Email já cadastrado!" });
            return;
        }

        let passwordCripted = password;
        
        if (!validator.isHash(password)){
            const salt = await bcrypt.genSalt(10);
            passwordCripted = await bcrypt.hash(password, salt)
        }
        
        const result = await User.create(name, email, passwordCripted, institution, country, city, lattes, 0);
    
        if (result.sucess) {
            res.status(201).json({ msg: "Usuário criado com sucesso!.", result });
            return
        }
    }

    async updateUser(req, res) {
        const id = req.params.id;
        const { name, email, password, institution, country, city, lattes, role } = req.body;
        const oldUser = await User.find({ _id: id })

        if (await User.emailExists(email) && oldUser[0].email !== email) {
            res.status(403).json({ err: "Email já cadastrado!" });
            return;
        }

        let passwordCripted = password;

        if (!validator.isHash(password)){
            const salt = await bcrypt.genSalt(10);
            const passwordCripted = await bcrypt.hash(password, salt)
        }
        const user = User.update(id, name, email, passwordCripted, institution, country, city, lattes, role)

        if (user) {
            res.status(200).json({ msg: "Usuário atualizado com sucesso!" });
            return
        } 
        
        res.status(403).json({ err: "Erro ao atualizar!" });
    }

    async deleteUser(req, res) {
        const { id } = req.params;

        try {
            const user = await User.delete(id);

            if (user) {
                res.status(200).json({ msg: "Usuário deletado com sucesso!" });
            } else {
                res.status(404).json({ msg: "Usuário não encontrado!" });
            }
        } catch (error) {
            res.status(400).json({ msg: "Erro ao deletar!." });
        }
    }
}

module.exports = new UserController();
