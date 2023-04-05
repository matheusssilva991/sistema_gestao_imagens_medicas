const validator = require("validator");
const User = require("../models/User");

class UserMiddleware {

    async checkValidFields(req, res, next){
        const { name, email, password, institution, country, city, lattes } = req.body;

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
    }
}

module.exports = new UserMiddleware ();
