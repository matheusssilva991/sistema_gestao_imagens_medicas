const UserService = require("../services/UserService");
const SolicitationService = require("../services/SolicitationService");
const AuthTokenService = require("../services/AuthTokenService");

const bcrypt = require("bcrypt");
const validator = require("validator");
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");

class UserController {
    async getUsers (req, res) {
        const users = await UserService.find();
        let filteredUsers = [];

        for (let user of users) {
            let { password, ...resultObject } = user._doc;
            filteredUsers.push(resultObject);
        }
        
        res.status(200).json(filteredUsers);
        return;
    }

    async getUser (req, res) {
        const id = req.params.id;
        const user = await UserService.find({_id: id });

        if (user[0]){
            let { password, ...resultObject } = user[0]._doc;
            res.status(200).json(resultObject);
            return;

        } else {
            res.status(404).json({ err: "Usuário não encontrado" });
            return;
        }
    }

    async newUser (req, res) {
        const { idSolicitation } = req.body;
        const solicitation = await SolicitationService.find({ _id: idSolicitation });

        if (solicitation[0].type != 'newUser'){
            res.status(400).json({ err: "Tipo de solicitação incorreto." });
            return;
        }  else if (solicitation[0].status === 'accepted' || solicitation[0].status === 'rejected'){
            res.status(403).json({ err: "Solicitação inválida!" });
            return;
        }

        let { name, email, password, institution, country, city, lattes } = solicitation[0].data;

        if (!await UserService.emailExists(email)) {
            const result = await UserService.create(name, email, password, institution, country, city, lattes, 0);
        
            if (result.sucess) {
                res.status(201).json({ msg: "Usuário criado com sucesso!." });
                await SolicitationService.update(idSolicitation, "accepted");
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

    async updateRole(req, res) {
        const id = req.params.id;
        let { role } = req.body;
        const user = await UserService.find({ _id: id })

        if (!user[0]){
            res.status(404).json({ err: "Usuário não encontrado!" });
            return;
        }

        if (role != 0 && role != 1){
            res.status(400).json({ err: "Tipo de usuário inválido." });
            return;
        } 

        try {
            await UserService.update(id, user.name, user.email, user.password, user.institution, user.country, 
                                     user.city, user.lattes, role);

            res.status(200).json({ msg: "Tipo de usuário atualizado com sucesso!" });
            return;
        } catch (error) {
            res.status(400).json({ err: "Erro ao atualizar." });
            return;
        }
        
    }

    async updateUser(req, res) {
        const id = req.params.id;
        let { name, email, password, institution, country, city, lattes} = req.body;
        const user = await UserService.find({ _id: id })

        if (!user[0]){
            res.status(404).json({ err: "Usuário não encontrado!" });
            return;
        }

        const emailExists = await UserService.emailExists(email);

        if (!emailExists || emailExists && user[0].email.toLowerCase() === email.toLowerCase()) {
            let passwordCripted = password;

            if (!validator.isHash(password)){
                const salt = await bcrypt.genSalt(10);
                passwordCripted = await bcrypt.hash(password, salt)
            }
            
            await UserService.update(id, name, email, passwordCripted, institution, country, city, lattes,
                                     user.role);

            res.status(200).json({ msg: "Usuário atualizado com sucesso!" });
            return;
        } else {
            res.status(403).json({ err: "Email já cadastrado!" });
            return;
        }
    }

    async deleteUser(req, res) {
        const { id } = req.params;
        const user = await UserService.find({ _id: id})

        if (user[0] === undefined){
            res.status(404).json({ err: "Usuário não encontrado!" });
            return;
        }

        try {
            await UserService.delete(id);
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

        let user = await UserService.find({ email });
        user = user[0];

        if (user){
            const result = await bcrypt.compare(password, user.password);          
            
            if (result){
                const token = jwt.sign({ id: user._id, name: user.name, 
                                        email: user.email, role: user.role }, secret, 
                                       { expiresIn: 3600 });

                const resultToken = await AuthTokenService.create(token);

                if (resultToken.sucess)
                    res.status(200).json({ token: token });
                else
                    res.status(400).json({ err: "Erro na criação do token"});

            } else 
                res.status(406).json({ err: "Senha incorreta." }); 

        } else 
            res.status(403).json({ err: "Não existe usuário cadastrado com esse e-mail." });
    }

    async logout (req, res) {
        let token = req.headers['authorization'].split(" ")[1];
        const authToken = await AuthTokenService.find(token);

        if (authToken[0] == undefined) {
            res.status(404).json({ err: "Token não encontrado!" });
            return;
        }

        try {
            await AuthTokenService.delete(authToken[0]._id);
            res.status(200).json({ msg: "Logout realizado com sucesso!" });
            return;

        } catch (error) {
            res.status(400).json({ msg: "Erro ao deslogar!." });
            return;
        }
    }

    async authenticate (req, res) {
        let token = req.headers['authorization'].split(" ")[1];
        const authToken = await AuthTokenService.find(token);
        const secret = process.env.SECRET;

        if (authToken[0] == undefined) {
            res.status(404).json({ err: "Token não encontrado!" });
            return;
        }

        let decoded = jwt.verify(token, secret);
        delete decoded['iat'];
        delete decoded['exp'];

        res.status(200).json(decoded);

    }
}

module.exports = new UserController();
