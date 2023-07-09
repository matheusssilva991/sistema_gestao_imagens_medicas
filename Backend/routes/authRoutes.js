const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");
const Auth = require("../middlewares/Auth");

router.post('/login', UserController.login);
router.get('/logout', Auth.loginAuth, UserController.logout);
router.get('/authenticate', UserController.authenticate);

module.exports = router;
