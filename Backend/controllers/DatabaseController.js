const Database = require("../models/Database");

class DatabaseController {
    async newDatabase (req, res) {
        const { name, examType, description, imageQuality, imageType, sourceLink } = req.body;

        if(await Database.databaseExists(name)){
            res.status(403).json({ err: "Já existe banco de dados cadastrado com esse nome!" });
            return;
        }

        const result = await Database.create(name, examType, description, imageQuality, imageType, sourceLink);

        if (result.sucess) {
            res.status(201).json({ msg: "Banco de dados criado com sucesso!." });
            return
        }
    }

    async getDatabases (req, res) {
        const databases = await Database.find();

        res.status(200).json(databases);
        return
    }

    async getDatabase (req, res) {
        const id = req.params.id;

        const database = await Database.find({ _id: id });

        res.status(200).json(database[0]);
        return
    }

    async updateDatabase (req, res) {
        const id = req.params.id;
        const { name, examType, description, imageQuality, imageType, sourceLink } = req.body;

        const result = await Database.update(id, name, examType, description, imageQuality,
                                                imageType, sourceLink);
        
        if (result.sucess){
            res.status(200).json({ msg: "Banco de dados atualizado com sucesso" });
            return;
        } else {
            res.status(404).json({ err: "Banco de dados não encontrado" });
            return
        }
    }

    async deleteDatabase (req, res) {
        const { id } = req.params;

        try {
            const result = await Database.delete(id);

            if (result.sucess) {
                res.status(200).json({ msg: "Banco de dados deletado com sucesso!" });
            } else {
                res.status(404).json({ msg: "Banco de dados não encontrado!" });
            }
        } catch (error) {
            res.status(400).json({ msg: "Erro ao deletar!." });
        }
    }
}

module.exports = new DatabaseController();
