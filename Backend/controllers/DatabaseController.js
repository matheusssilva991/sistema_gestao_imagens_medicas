const DatabaseService = require("../services/DatabaseService");
const ImageTypeService = require("../services/ImageTypeService");

class DatabaseController {

    async getDatabases (req, res) {
        const databases = await DatabaseService.find();

        res.status(200).json(databases);
        return
    }

    async getDatabase (req, res) {
        const id = req.params.id;
        const databases = await DatabaseService.find({ _id: id });

        if (databases[0]){
            res.status(200).json(databases[0]);
            return
        } else {
            res.status(404).json({ err: "Banco de dados não encontrado" });
            return;
        }
    }

    async newDatabase (req, res) {
        const { name, examType, description, imageQuality, imageType, sourceLink } = req.body;

        if(await DatabaseService.databaseExists(name)){
            res.status(403).json({ err: "Já existe banco de dados cadastrado com esse nome!" });
            return;
        }

        if (!await ImageTypeService.imageTypeExists(imageType)){
            res.status(400).json({ err: "Tipo de imagem não existe!" });
            return;
        }

        const result = await DatabaseService.create(name, examType, description, imageQuality, imageType, sourceLink);

        if (result.sucess) {
            res.status(201).json({ msg: "Banco de dados criado com sucesso!." });
            return
            
        } else {
            res.status(400).json({ err: "Erro ao cadastrar." });
            return;
        }
    }

    async updateDatabase (req, res) {
        const id = req.params.id;
        const { name, examType, description, imageQuality, imageType, sourceLink } = req.body;
        const database = await DatabaseService.find({ _id: id });

        if (!database[0]) {
            res.status(404).json({ err: "Banco de dados não encontrado!" });
            return;
        }

        if (!await ImageTypeService.imageTypeExists(imageType)){
            res.status(400).json({ err: "Tipo de imagem não existe!" });
            return;
        }

        const databaseExists = await DatabaseService.databaseExists(name);
        const namesEquals = name.toLowerCase() === database[0].name.toLowerCase();

        if (!databaseExists || (databaseExists && namesEquals)){
            await DatabaseService.update(id, name, examType, description, imageQuality, imageType, sourceLink);

            res.status(200).json({ msg: "Banco de dados atualizado com sucesso" });
            return;

        } else {
            res.status(403).json({ err: "Já existe banco de dados cadastrado com esse nome!" });
            return;
        }  
    }

    async deleteDatabase (req, res) {
        const { id } = req.params;
        const database = await DatabaseService.find({ _id: id });

        if (database[0]) {
            try {
                await DatabaseService.delete(id);
    
                res.status(200).json({ msg: "Banco de dados deletado com sucesso!" });
                return;
                
            } catch (error) {
                res.status(400).json({ msg: "Erro ao deletar!." });
                return;
            }

        } else {
            res.status(404).json({ err: "Banco de dados não encontrado!" });
            return;
        }
    }
}

module.exports = new DatabaseController();
