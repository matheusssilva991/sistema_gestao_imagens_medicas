const User = require("../models/User");
const TempPermission = require("../models/TempPermission");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config()

module.exports = {
    async adminAuth (req, res, next) {
        const authToken = req.headers['authorization'];

        if (authToken != undefined){
            const bearer = authToken.split(" ");
            const token = bearer[1];
            const secret = process.env.SECRET;

            try {
                const decoded = jwt.verify(token, secret);
                
                if(decoded.role == 1){
                    next();
                } else{
                    res.status(403).send("Você não tem permissão para isso!");
                    return;  
                }
            } catch (err) {
                res.status(403).send("Você não está autenticado1");
                return;            
            }
            
        } else {
            res.status(403).send("Você não está autenticado2");
            return; 
        }
    },

    async loginAuth (req, res, next) { 
        const authToken = req.headers['authorization'];

        if (authToken != undefined){
            const bearer = authToken.split(" ");
            const token = bearer[1];

            try {
                const decoded = jwt.verify(token, secret);
                next();
            } catch (err) {
                res.status(403).send("Você não está autenticado");
                return;            
            }
            
        } else {
            res.status(403).send("Você não está autenticado");
            return; 
        }
    },

    async insertDbAuth (req, res, next) {
        const authToken = req.headers['authorization'];

        if (authToken != undefined){
            const bearer = authToken.split(" ");
            const token = bearer[1];

            try {
                const decoded = jwt.verify(token, secret);
                const tmpPermission = TempPermission.find({ userId: decoded.id, used: false });

                if (decoded.role == 1 || tmpPermission.length > 0){
                    next();
                } else{
                    res.status(403).send("Você não tem permissão para isso!");
                    return;  
                }

            } catch (err) {
                res.status(403).send("Você não está autenticado");
                return;            
            }
            
        } else {
            res.status(403).send("Você não está autenticado");
            return; 
        }
    }
}
