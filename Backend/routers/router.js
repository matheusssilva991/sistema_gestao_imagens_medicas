const express = require("express");
const app = express();
const router = express.Router();
const UserController = require("../controllers/UserController");
const SolicitationController = require("../controllers/SolicitationController");
const UserMiddleware = require("../middlewares/UserMiddleware");
const SolicitationMiddleware = require("../middlewares/SolicitationMiddleware");

// Usuários
router.get('/users', UserController.getUsers);
router.get('/users/:id', UserController.getUser);
router.post('/users', UserMiddleware.checkValidFields, UserController.newUser);
router.put('/users/:id', UserMiddleware.checkValidFields, UserController.updateUser);
router.delete('/users/:id', UserController.deleteUser);

// Solicitações
router.get('/solicitations', SolicitationController.getSolicitations);
router.get('/solicitations/:id', SolicitationController.getSolicitation);
router.post('/solicitations', SolicitationMiddleware.checkValidFields, SolicitationController.newSolicitation);
router.put('/solicitations/:id', SolicitationController.updateSolicitation);
router.delete('/solicitations/:id', SolicitationController.deleteSolicitation);

module.exports = router;
