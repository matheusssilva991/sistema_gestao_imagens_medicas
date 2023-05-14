const express = require("express");
const app = express();
const router = express.Router();

const UserController = require("../controllers/UserController");
const SolicitationController = require("../controllers/SolicitationController");
const DatabaseController = require("../controllers/DatabaseController");
const ImageTypeController = require("../controllers/ImageTypeController");

const Auth = require("../middlewares/Auth");
const CheckFields = require("../middlewares/CheckFields");

/* // Usuários
router.get('/api/users', Auth.adminAuth, UserController.getUsers);
router.get('/api/users/:id', Auth.loginAuth, UserController.getUser);
router.post('/api/users', Auth.adminAuth, UserController.newUser);
router.put('/api/users/:id', Auth.adminAuth, CheckFields.checkUserFields, UserController.updateUser);
router.delete('/api/users/:id', Auth.adminAuth, UserController.deleteUser);
router.post('/login', UserController.login);
router.get('/logout', Auth.loginAuth, UserController.logout);

// Solicitações
router.get('/api/solicitations', Auth.adminAuth, SolicitationController.getSolicitations);
router.get('/api/solicitations/:id', Auth.adminAuth, SolicitationController.getSolicitation);
router.post('/api/solicitations', Auth.authDbSolicitation, CheckFields.checkSolicitationFields, SolicitationController.newSolicitation);
router.put('/api/solicitations/:id', Auth.adminAuth, SolicitationController.updateSolicitation);
router.delete('/api/solicitations/:id', Auth.adminAuth, SolicitationController.deleteSolicitation);

// Bancos de dados
router.get('/api/databases', Auth.loginAuth, DatabaseController.getDatabases);
router.get('/api/databases/:id', Auth.loginAuth, DatabaseController.getDatabase);
router.post('/api/databases', Auth.adminAuth, CheckFields.checkEmptyFields, DatabaseController.newDatabase);
router.put('/api/databases/:id', Auth.adminAuth, CheckFields.checkEmptyFields, DatabaseController.updateDatabase);
router.delete('/api/databases/:id',Auth.adminAuth, DatabaseController.deleteDatabase);
router.get('/api/databases/images', Auth.loginAuth, DatabaseController.getImages);
router.get('/api/databases/:databaseName/images', Auth.loginAuth, DatabaseController.getImages);

// Tipos de imagens
router.get('/api/images-types', Auth.loginAuth, ImageTypeController.getImagesTypes);
router.get('/api/images-types/:id', Auth.loginAuth, ImageTypeController.getImageType);
router.post('/api/images-types', Auth.adminAuth, CheckFields.checkEmptyFields, ImageTypeController.newImageType);
router.put('/api/images-types/:id', Auth.adminAuth, CheckFields.checkEmptyFields, ImageTypeController.updateImageType);
router.delete('/api/images-types/:id', Auth.adminAuth, ImageTypeController.deleteImageType); */

// Usuários
router.get('/api/users', UserController.getUsers);
router.get('/api/users/:id', UserController.getUser);
router.post('/api/users', UserController.newUser);
router.put('/api/users/:id', CheckFields.checkUserFields, UserController.updateUser);
router.delete('/api/users/:id', UserController.deleteUser);
router.post('/login', UserController.login);
router.get('/logout', UserController.logout);

// Solicitações
router.get('/api/solicitations', SolicitationController.getSolicitations);
router.get('/api/solicitations/:id', SolicitationController.getSolicitation);
router.post('/api/solicitations', Auth.authDbSolicitation, CheckFields.checkSolicitationFields, SolicitationController.newSolicitation);
router.put('/api/solicitations/:id', SolicitationController.updateSolicitation);
router.delete('/api/solicitations/:id', SolicitationController.deleteSolicitation);

// Bancos de dados
router.get('/api/databases', DatabaseController.getDatabases);
router.get('/api/databases/:id', DatabaseController.getDatabase);
router.post('/api/databases', CheckFields.checkEmptyFields, DatabaseController.newDatabase);
router.put('/api/databases/:id', CheckFields.checkEmptyFields, DatabaseController.updateDatabase);
router.delete('/api/databases/:id', DatabaseController.deleteDatabase);
router.get('/api/databases/images', DatabaseController.getImages);
router.get('/api/databases/:databaseName/images', DatabaseController.getImages);

// Tipos de imagens
router.get('/api/images-types', ImageTypeController.getImagesTypes);
router.get('/api/images-types/:id', ImageTypeController.getImageType);
router.post('/api/images-types', CheckFields.checkEmptyFields, ImageTypeController.newImageType);
router.put('/api/images-types/:id', CheckFields.checkEmptyFields, ImageTypeController.updateImageType);
router.delete('/api/images-types/:id', ImageTypeController.deleteImageType);

module.exports = router;
