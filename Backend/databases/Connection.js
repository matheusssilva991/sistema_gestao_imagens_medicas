const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const URL_DATABASE_CONNECTION = process.env.URL_DATABASE_CONNECTION;

class Database {
    constructor(){
        this._connect();
    }

    async _connect (){
        try {
            await mongoose.connect(URL_DATABASE_CONNECTION);

            console.log("Conectado ao MongoDB!.");
        } catch (err) {
            console.log(`Erro ao conectar com o Banco, ${err}`);
        }

    }
}

module.exports = new Database();
