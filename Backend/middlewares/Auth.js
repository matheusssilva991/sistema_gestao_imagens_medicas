const User = require("../models/User");
const AuthToken = require("../models/AuthToken");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

module.exports = {
    async adminAuth (req, res, next) {
        const authToken = req.headers['authorization'];

        if (authToken != undefined){
            const token = authToken.split(" ")[1];
            const secret = process.env.SECRET;

            try {
                const decoded = jwt.verify(token, secret);
                const tokenDatabase = await AuthToken.find(token);

                if (tokenDatabase[0] === undefined){
                    res.status(403).send("Token inválido, não existe na base de dados!");
                    return; 
                }
                
                if(decoded.role == 1){
                    next();
                } else{
                    res.status(403).send("Você não tem permissão para isso!");
                    return;  
                }
            } catch (err) {
                res.status(403).send("Token inválido!..");
                return;            
            }
            
        } else {
            res.status(403).send("Você não está autenticado");
            return; 
        }
    },

    async loginAuth (req, res, next) { 
        const authToken = req.headers['authorization'];

        if (authToken != undefined){
            const token = authToken.split(" ")[1];
            const secret = process.env.SECRET;

            try {
                const decoded = jwt.verify(token, secret);
                const tokenDatabase = await AuthToken.find(token);

                if (tokenDatabase[0] === undefined){
                    res.status(403).send("Token inválido, não existe na base de dados!");
                    return; 
                }

                next();
            } catch (err) {
                res.status(403).send("Token inválido!.");
                return;            
            }
            
        } else {
            res.status(403).send("Você não está autenticado");
            return; 
        }
    }
}
