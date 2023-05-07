const validator = require("validator");
const Solicitation = require("../models/Solicitation");
const Database = require("../models/Database");
const User = require("../models/User");

module.exports =  {
    async checkEmptyFields(req, res, next) {
        const tmp = req.body;

        for (const key in tmp) {
            if (typeof tmp[key] === 'string'){
                if (validator.isEmpty(tmp[key])){
                    res.status(401).json({ err: `O campo ${key} não pode ser vazio!` });
                    return;
                }
            }
        }
        next();
    }, 

    async checkUserFields(req, res, next){
        const { name, email, password, institution, country, city } = req.body;

        if (!validator.isEmail(email)){
            res.status(400).json({ err: "O e-mail é invalido!" });
            return;
        }

        if (!validator.isStrongPassword(password, { returnScore: false })){
            res.status(400).json({ err: "A senha é invalida!" });
            return;
        }

        const tmp = { name, institution, country, city}

        for (const key in tmp) {
            if (validator.isEmpty(tmp[key])){
                res.status(401).json({ err: `O campo ${key} não pode ser vazio!` });
                return
            }
        };

        next()
    },

    async checkSolicitationFields(req, res, next){
        let { type, data } = req.body;
        let tmp = { type };

        if (type === 'newUser' ){
            const { name, email, password, institution, country, city, lattes } = data

            if (!validator.isEmail(email)){
                res.status(400).json({ err: "O e-mail é invalido!" });
                return;
            }

            if (await User.emailExists(email)) {
                res.status(403).json({ err: "Já existe cadastro com esse e-mail!" });
                return;
            }

            if (await Solicitation.solicitationEmailExists(email)) {
                res.status(403).json({ err: "Já existe solicitação de cadastro com esse e-mail!" });
                return;
            }
            
            if (!validator.isStrongPassword(password, { returnScore: false })){
                res.status(400).json({ err: "A senha é fraca!" });
                return;
            }

            Object.assign(tmp, tmp, { name, institution, country, city, lattes })

        } else if (type === 'newDatabase') {
            const { name, description, sourceLink } = data

            if (await Solicitation.solicitationDatabaseExists(name)) {
                res.status(403).json({ err: "Já existe solicitação para esse banco de dados!" });
                return;
            }

            if (await Database.DatabaseExists(name)) {
                res.status(403).json({ err: "Já existe um banco de dados cadastrado com esse nome!" });
                return;
            }

            Object.assign(tmp, tmp, { name, description, sourceLink })
        }

        for (const key in tmp) {
            if (validator.isEmpty(tmp[key])){
                res.status(401).json({ err: `O campo ${key} não pode ser vazio!` });
                return
            }
        }

        next()
    }
}
