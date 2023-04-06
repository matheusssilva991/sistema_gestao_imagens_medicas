const express = require("express");
const app = express();
const router = express.Router();

const UserController = require("../controllers/UserController");
const SolicitationController = require("../controllers/SolicitationController");
const DatabaseController = require("../controllers/DatabaseController");
const TempPermissionController = require("../controllers/TempPermissionController");

const Auth = require("../middlewares/Auth");
const CheckFields = require("../middlewares/CheckFields");

/* // Usuários
router.get('/users', Auth.adminAuth, UserController.getUsers);
router.get('/users/:id', Auth.loginAuth, UserController.getUser);
router.post('/users', Auth.adminAuth, CheckFields.checkUserFields, UserController.newUser);
router.put('/users/:id', Auth.adminAuth, CheckFields.checkUserFields, UserController.updateUser);
router.delete('/users/:id', Auth.adminAuth, UserController.deleteUser);
router.post('/login', UserController.login);

// Solicitações
router.get('/solicitations', Auth.loginAuth, SolicitationController.getSolicitations);
router.get('/solicitations/:id', Auth.loginAuth, SolicitationController.getSolicitation);
router.post('/solicitations', CheckFields.checkSolicitationFields, SolicitationController.newSolicitation);
router.put('/solicitations/:id', Auth.adminAuth, SolicitationController.updateSolicitation);
router.delete('/solicitations/:id', Auth.adminAuth, SolicitationController.deleteSolicitation);

// Bancos de dados
router.get('/databases', Auth.loginAuth, DatabaseController.getDatabases);
router.get('/databases/:id', Auth.loginAuth, DatabaseController.getDatabase);
router.post('/databases', Auth.insertDbAuth, CheckFields.checkEmptyFields, DatabaseController.newDatabase);
router.put('/databases/:id', Auth.adminAuth, CheckFields.checkEmptyFields, DatabaseController.updateDatabase);
router.delete('/databases/:id',Auth.adminAuth, DatabaseController.deleteDatabase);

// Permissões Temporarias
router.get('/temp-permissions', Auth.loginAuth, TempPermissionController.getTempPermissions);
router.get('/temp-permissions/:id', Auth.loginAuth, TempPermissionController.getTempPermission);
router.post('/temp-permissions', Auth.adminAuth, TempPermissionController.newTempPermission);
router.put('/temp-permissions/:id', Auth.loginAuth, TempPermissionController.updateTempPermission);
router.delete('/temp-permissions/:id', Auth.loginAuth, TempPermissionController.deleteTempPermission);
 */

// Usuários
router.get('/users', UserController.getUsers);
router.get('/users/:id', UserController.getUser);
router.post('/users', CheckFields.checkUserFields, UserController.newUser);
router.put('/users/:id', CheckFields.checkUserFields, UserController.updateUser);
router.delete('/users/:id', UserController.deleteUser);
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

// Permissões Temporarias
router.get('/temp-permissions', TempPermissionController.getTempPermissions);
router.get('/temp-permissions/:id', TempPermissionController.getTempPermission);
router.post('/temp-permissions', TempPermissionController.newTempPermission);
router.put('/temp-permissions/:id', TempPermissionController.updateTempPermission);
router.delete('/temp-permissions/:id', TempPermissionController.deleteTempPermission);

module.exports = router;
