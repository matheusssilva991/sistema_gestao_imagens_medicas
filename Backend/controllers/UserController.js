const User = require("../models/User");
const bcrypt = require("bcrypt");
const validator = require("validator");
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");

class UserController {
    async getUsers (req, res) {
        const users = await User.find();

        res.status(200).json(users);
        return
    }

    async getUser (req, res) {
        const id = req.params.id;
        const user = await User.find({_id: id });

        if (user[0]){
            res.status(200).json(user[0]);
            return;

        } else {
            res.status(404).json({ err: "Usuário não encontrado" });
            return;
        }
    }

    async newUser (req, res) {
        let { name, email, password, institution, country, city, lattes, role } = req.body;

        role = role || 0;

        if (!await User.emailExists(email)) {
            
            let passwordCripted = password;
        
            if (!validator.isHash(password)){
                const salt = await bcrypt.genSalt(10);
                passwordCripted = await bcrypt.hash(password, salt)
            }
            
            const result = await User.create(name, email, passwordCripted, institution, country, city, lattes, role);
        
            if (result.sucess) {
                res.status(201).json({ msg: "Usuário criado com sucesso!." });
                return;
            } else {
                res.status(400).json({ err: "Erro ao cadastrar." });
                return;
            }

        } else {
            res.status(403).json({ err: "Email já cadastrado!" });
            return; 
        }  
    }

    async updateUser(req, res) {
        const id = req.params.id;
        let { name, email, password, institution, country, city, lattes, role, temporaryPermission } = req.body;
        const user = await User.find({ _id: id })

        temporaryPermission = temporaryPermission || false;

        if (!user[0]){
            res.status(404).json({ err: "Usuário não encontrado!" });
            return;
        }

        const emailExists = await User.emailExists(email);

        if (!emailExists || emailExists && user[0].email.toLowerCase() === email.toLowerCase()) {
            let passwordCripted = password;

            if (!validator.isHash(password)){
                const salt = await bcrypt.genSalt(10);
                passwordCripted = await bcrypt.hash(password, salt)
            }

            await User.update(id, name, email, passwordCripted, institution, country, city, lattes, role,
                              temporaryPermission)

            res.status(200).json({ msg: "Usuário atualizado com sucesso!" });
            return;
        } else {
            res.status(403).json({ err: "Email já cadastrado!" });
            return;
        }
    }

    async deleteUser(req, res) {
        const { id } = req.params;
        const user = await User.find({ _id: id})

        if (user[0] === undefined){
            res.status(404).json({ err: "Usuário não encontrado!" });
            return;
        }

        try {
            await User.delete(id);
            res.status(200).json({ msg: "Usuário deletado com sucesso!" });
            return;

        } catch (error) {
            res.status(400).json({ msg: "Erro ao deletar!." });
            return;
        }
    }

    async login (req, res) {
        const { email, password } = req.body;
        const secret = process.env.SECRET;

        let user = await User.find({ email });
        user = user[0];

        if (user){
            const result = await bcrypt.compare(password, user.password);             
            
            if (result){
                const token = jwt.sign({ id: user._id, email: user.email, role: user.role, 
                    temporaryPermission: user.temporaryPermission }, secret);

                res.status(200).json({ token: token });

            } else 
                res.status(406).json({ err: "Senha incorreta" }); 

        } else 
            res.status(406).json({ err: "O usuário não existe!" });
    }
}

module.exports = new UserController();
