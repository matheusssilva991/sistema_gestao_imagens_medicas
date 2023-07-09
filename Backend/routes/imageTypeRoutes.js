const express = require("express");
const router = express.Router();

const ImageTypeController = require("../controllers/ImageTypeController");

const Auth = require("../middlewares/Auth");
const CheckFields = require("../middlewares/CheckFields");

router.get('/api/images-types', ImageTypeController.getImagesTypes);
router.get('/api/image-type/:id', ImageTypeController.getImageType);
router.post('/api/image-type', Auth.adminAuth, CheckFields.checkEmptyFields, ImageTypeController.newImageType);
router.put('/api/image-type/:id', Auth.adminAuth, CheckFields.checkEmptyFields, ImageTypeController.updateImageType);
router.delete('/api/image-type/:id', Auth.adminAuth, ImageTypeController.deleteImageType); 

module.exports = router;
