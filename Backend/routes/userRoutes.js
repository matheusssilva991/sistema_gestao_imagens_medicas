const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");

const Auth = require("../middlewares/Auth");
const CheckFields = require("../middlewares/CheckFields");

router.get('/api/users', UserController.getUsers);
router.get('/api/user/:id', UserController.getUser);
router.post('/api/user', Auth.adminAuth, UserController.newUser);
router.put('/api/user/:id', Auth.loginAuth, CheckFields.checkUserFields, UserController.updateUser);
router.delete('/api/user/:id', Auth.adminAuth, UserController.deleteUser);
router.put('/api/user/:id/permissao', Auth.adminAuth, UserController.updateRole);

module.exports = router;
