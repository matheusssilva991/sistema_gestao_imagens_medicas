const express = require("express");
const app = express();
const router = express.Router();

const UserController = require("../controllers/UserController");
const SolicitationController = require("../controllers/SolicitationController");
const DatabaseController = require("../controllers/DatabaseController");
const ImageTypeController = require("../controllers/ImageTypeController");

const Auth = require("../middlewares/Auth");
const CheckFields = require("../middlewares/CheckFields");

// Usuários
router.get('/users', Auth.adminAuth, UserController.getUsers);
router.get('/users/:id', Auth.loginAuth, UserController.getUser);
router.post('/users', Auth.adminAuth, CheckFields.checkUserFields, UserController.newUser);
router.put('/users/:id', Auth.adminAuth, CheckFields.checkUserFields, UserController.updateUser);
router.delete('/users/:id', Auth.adminAuth, UserController.deleteUser);
router.post('/login', UserController.login);

// Solicitações
router.get('/solicitations', Auth.adminAuth, SolicitationController.getSolicitations);
router.get('/solicitations/:id', Auth.adminAuth, SolicitationController.getSolicitation);
router.post('/solicitations', CheckFields.checkSolicitationFields, SolicitationController.newSolicitation);
router.put('/solicitations/:id', Auth.adminAuth, SolicitationController.updateSolicitation);
router.delete('/solicitations/:id', Auth.adminAuth, SolicitationController.deleteSolicitation);

// Bancos de dados
router.get('/databases', Auth.loginAuth, DatabaseController.getDatabases);
router.get('/databases/:id', Auth.loginAuth, DatabaseController.getDatabase);
router.post('/databases', Auth.insertDbAuth, CheckFields.checkEmptyFields, DatabaseController.newDatabase);
router.put('/databases/:id', Auth.adminAuth, CheckFields.checkEmptyFields, DatabaseController.updateDatabase);
router.delete('/databases/:id',Auth.adminAuth, DatabaseController.deleteDatabase);

// Tipos de imagens
router.get('/images-types', Auth.loginAuth, ImageTypeController.getImagesTypes);
router.get('/images-types/:id', Auth.loginAuth, ImageTypeController.getImageType);
router.post('/images-types', Auth.adminAuth, CheckFields.checkEmptyFields, ImageTypeController.newImageType);
router.put('/images-types/:id', Auth.adminAuth, CheckFields.checkEmptyFields, ImageTypeController.updateImageType);
router.delete('/images-types/:id', Auth.adminAuth, ImageTypeController.deleteImageType);

/* // Usuários
router.get('/users', UserController.getUsers); // Pegar dados
router.get('/users/:id', UserController.getUser);
router.post('/users', CheckFields.checkUserFields, UserController.newUser); // Enviar Dados
router.put('/users/:id', CheckFields.checkUserFields, UserController.updateUser); // Atualizar
router.delete('/users/:id', UserController.deleteUser); // Deletar
router.post('/login', UserController.login);

// Solicitações
router.get('/solicitations', SolicitationController.getSolicitations);
router.get('/solicitations/:id', SolicitationController.getSolicitation);
router.post('/solicitations', CheckFields.checkSolicitationFields, SolicitationController.newSolicitation);
router.put('/solicitations/:id', SolicitationController.updateSolicitation);
router.delete('/solicitations/:id', SolicitationController.deleteSolicitation);

// Bancos de dados
router.get('/databases', DatabaseController.getDatabases);
router.get('/databases/:id', DatabaseController.getDatabase);
router.post('/databases', CheckFields.checkEmptyFields, DatabaseController.newDatabase);
router.put('/databases/:id', CheckFields.checkEmptyFields, DatabaseController.updateDatabase);
router.delete('/databases/:id', DatabaseController.deleteDatabase);

// Tipos de imagens
router.get('/images-types', ImageTypeController.getImagesTypes);
router.get('/images-types/:id', ImageTypeController.getImageType);
router.post('/images-types', CheckFields.checkEmptyFields, ImageTypeController.newImageType);
router.put('/images-types/:id', CheckFields.checkEmptyFields, ImageTypeController.updateImageType);
router.delete('/images-types/:id', ImageTypeController.deleteImageType);
 */

module.exports = router;
