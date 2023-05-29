const sharp = require('sharp')
const fs = require("fs");
const fsPromises = require('fs').promises;
const dicomParser = require('dicom-parser');
const PNG = require('pngjs').PNG;

class ImageProcessingService {
    async convertDicomPNG (imagePath, resultPath) {

        // Ler o arquivo DICOM
        //const dicomBuffer = fs.readFileSync(imagePath);
        const dicomBuffer = await fsPromises.readFile(imagePath)
                                .catch((err) => console.error('Failed to read file', err)); 

        // Parsear os dados DICOM
        const dicomData = dicomParser.parseDicom(dicomBuffer);
    
        // Obter as informações relevantes da imagem DICOM
        const rows = dicomData.uint16('x00280010');
        const columns = dicomData.uint16('x00280011');
        const pixelDataElement = dicomData.elements.x7fe00010;
        let pixelData = new Uint16Array(dicomData.byteArray.buffer, pixelDataElement.dataOffset, 
            pixelDataElement.length / 2);
     
        // Criar um novo objeto PNG com as dimensões da imagem
        const png = new PNG({ width: columns, height: rows });
    
        let maxPixel = pixelData.reduce((max, pixel) => Math.max(max, pixel), 0);
    
        // Copiar os dados de pixel para o objeto PNG
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                const pixelIndex = i * columns + j;
                const pixelValue = (pixelData[pixelIndex] / maxPixel) * 255;
                const pngPixelIndex = (i * columns + j) * 4;
    
                // Definir o valor de pixel no objeto PNG
                png.data[pngPixelIndex] = pixelValue;
                png.data[pngPixelIndex + 1] = pixelValue;
                png.data[pngPixelIndex + 2] = pixelValue;
                png.data[pngPixelIndex + 3] = 255; // Alpha channel (255 = opaco)
            }
        }
        // Salvar o objeto PNG em um arquivo
        let outputStream = undefined
    
        if (resultPath)
            outputStream = fs.createWriteStream(resultPath);
        else
            outputStream = fs.createWriteStream(imagePath.replace(".dcm", "_processed.png"));
        png.pack().pipe(outputStream);
    }

    async resize (imagePath, size, outputPath) {
        try {
            const info = await sharp(imagePath)
                .resize({ width: size.width, height: size.height })
                .toFile(outputPath)
    
            console.log(info)

        } catch (error) {
            console.log(error)
        }
    }

    async saveImage(inputPath, outputPath){
        // Abrir a imagem de entrada
        try {
            // Abrir a imagem de entrada
            const data = await fsPromises.readFile(inputPath);
        
            // Salvar a imagem de entrada como imagem de saída
            await fsPromises.writeFile(outputPath, data);
        
            console.log('Imagem salva com sucesso!');
        } catch (err) {
            console.error('Erro ao abrir ou salvar a imagem:', err);
        }
    }

    convertDicomPNGSync (imagePath, resultPath) {

        // Ler o arquivo DICOM
        const dicomBuffer = fs.readFileSync(imagePath);

        // Parsear os dados DICOM
        const dicomData = dicomParser.parseDicom(dicomBuffer);
    
        // Obter as informações relevantes da imagem DICOM
        const rows = dicomData.uint16('x00280010');
        const columns = dicomData.uint16('x00280011');
        const pixelDataElement = dicomData.elements.x7fe00010;
        let pixelData = new Uint16Array(dicomData.byteArray.buffer, pixelDataElement.dataOffset, 
            pixelDataElement.length / 2);
     
        // Criar um novo objeto PNG com as dimensões da imagem
        const png = new PNG({ width: columns, height: rows });
    
        let maxPixel = pixelData.reduce((max, pixel) => Math.max(max, pixel), 0);
    
        // Copiar os dados de pixel para o objeto PNG
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                const pixelIndex = i * columns + j;
                const pixelValue = (pixelData[pixelIndex] / maxPixel) * 255;
                const pngPixelIndex = (i * columns + j) * 4;
    
                // Definir o valor de pixel no objeto PNG
                png.data[pngPixelIndex] = pixelValue;
                png.data[pngPixelIndex + 1] = pixelValue;
                png.data[pngPixelIndex + 2] = pixelValue;
                png.data[pngPixelIndex + 3] = 255; // Alpha channel (255 = opaco)
            }
        }
        // Salvar o objeto PNG em um arquivo
        let outputStream = undefined
    
        if (resultPath)
            outputStream = fs.createWriteStream(resultPath);
        else
            outputStream = fs.createWriteStream(imagePath.replace(".dcm", "_processed.png"));
        png.pack().pipe(outputStream);
    }

    resizeSync (imagePath, size, outputPath) {
        sharp(imagePath)
            .resize({ width: size.width, height: size.height })
            .toFile(outputPath)
            .then(info => console.log(info))
            .catch(erro => console.log(erro, 'erro aqui'));
    }
}

module.exports = new ImageProcessingService();
