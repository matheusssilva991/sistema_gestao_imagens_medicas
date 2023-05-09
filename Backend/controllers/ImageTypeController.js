const ImageTypeService = require("../services/ImageTypeService");

class ImageTypeController {

    async getImagesTypes (req, res) {
        const imagesTypes = await ImageTypeService.find();

        res.status(200).json(imagesTypes);
        return
    }

    async getImageType (req, res) {
        const id = req.params.id;
        const imageType = await ImageTypeService.find({ _id: id });

        if (imageType[0]) {
            res.status(200).json(imageType[0]);
            return;

        } else {
            res.status(404).json({ err: "Tipo de imagem não encontrado" });
            return;
        } 
    }

    async newImageType (req, res) {
        const { name, description, requiredData, optionalData } = req.body;

        if (!await ImageTypeService.imageTypeExists(name)) {
            const result = await ImageTypeService.create(name, description, requiredData, optionalData);

            if (result.sucess){
                res.status(201).json({ msg: "Tipo de imagem criado com sucesso!" });
                return

            } else {
                res.status(400).json({ err: "Erro ao cadastrar." });
                return;
            }

        } else {
            res.status(403).json({ err: "Tipo de imagem já cadastrado." });
            return;
        }
    }

    async updateImageType (req, res) {
        const id = req.params.id;
        const { name, description, requiredData, optionalData } = req.body;
        const imageType = await ImageTypeService.find({ _id: id });

        if (imageType[0]) {
            const imageTypeExists = await ImageTypeService.imageTypeExists(name);

            if (!imageTypeExists || imageTypeExists && imageType[0].name.toLowerCase() === name.toLowerCase()) {
                await ImageTypeService.update(id, name, description, requiredData, optionalData);

                res.status(200).json({ msg: "Tipo de imagem atualizado com sucesso" });
                return;

            } else {
                res.status(403).json({ err: "Já existe tipo de imagem cadastrado com esse nome!" });
                 return;
            }

        } else {
            res.status(404).json({ err: "Tipo de imagem não encontrado" });
            return;
        }
    }

    async deleteImageType (req, res) {
        const { id } = req.params;
        const imageType = await ImageTypeService.find({ _id: id });

        if (imageType[0]) {
            try {
                await ImageTypeService.delete(id);
                res.status(200).json({ msg: "Tipo de imagem deletado com sucesso!" });
                return;
    
            } catch (error) {
                res.status(400).json({ msg: "Erro ao deletar!." });
                return;
            }

        } else {
            res.status(404).json({ msg: "Tipo de imagem não encontrado!" });
            return;
        } 
    }
}

module.exports = new ImageTypeController();
