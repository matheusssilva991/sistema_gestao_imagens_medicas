const sharp = require("sharp");
const fs = require("fs");
const fsPromises = fs.promises;
const ImageProcessingService = require("./services/imageProcessingService");

async function resize (imagePath, size, outputPath) {

    try {
        const info = await sharp(imagePath).resize({ width: size.width, height: size.height }).toFile(outputPath)

        // Especificamos o nome e extensão do arquivo a ser deletado
        await fsPromises.unlink(imagePath, function (err){
            if (err) throw err;
                console.log('Arquivo deletado!');
        })

        console.log(info)
    } catch (error) {
        console.log(error)
    }
}

let imageDcmPath = "./assets/1-1.dcm"
let imagePath = "./assets/images/image_0_cbis-ddsm_teste.png"

ImageProcessingService.convertDicomPNG(imageDcmPath, imagePath)
resize(imagePath, {width: 64, height: 32}, imagePath.replace(".png", "_resized.png"))
