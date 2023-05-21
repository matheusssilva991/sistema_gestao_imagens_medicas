const express = require("express");
const router = express.Router();

const ImageTypeController = require("../controllers/ImageTypeController");

const Auth = require("../middlewares/Auth");
const CheckFields = require("../middlewares/CheckFields");

/*
router.get('/api/images-types', Auth.loginAuth, ImageTypeController.getImagesTypes);
router.get('/api/image-type/:id', Auth.loginAuth, ImageTypeController.getImageType);
router.post('/api/image-type', Auth.adminAuth, CheckFields.checkEmptyFields, ImageTypeController.newImageType);
router.put('/api/image-type/:id', Auth.adminAuth, CheckFields.checkEmptyFields, ImageTypeController.updateImageType);
router.delete('/api/images-types/:id', Auth.adminAuth, ImageTypeController.deleteImageType); 
*/

router.get('/api/images-types', ImageTypeController.getImagesTypes);
router.get('/api/image-type/:id', ImageTypeController.getImageType);
router.post('/api/image-type', CheckFields.checkEmptyFields, ImageTypeController.newImageType);
router.put('/api/image-type/:id', CheckFields.checkEmptyFields, ImageTypeController.updateImageType);
router.delete('/api/images-types/:id', ImageTypeController.deleteImageType); 

module.exports = router;
