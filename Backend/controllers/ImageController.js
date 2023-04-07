const Image = require("../models/Image");

class ImageController {
    async getImages(req, res) {
        const images = await Image.find();

        res.status(200).json(images);
        return
    }

    async getImage(req, res) {
        const id = req.params.id;
        const image = await Image.find();

        if (image[0]) {
            res.status(200).json(image);
            return;

        } else {
            res.status(404).json({ err: "Imagem não encontrada!" });
            return;
        }
    }
}

module.exports = new ImageController();
