const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");

const Auth = require("../middlewares/Auth");
const CheckFields = require("../middlewares/CheckFields");

/* router.post('/login', UserController.login);
router.get('/logout', Auth.loginAuth, UserController.logout); */

router.post('/login', UserController.login);
router.get('/logout', UserController.logout);

module.exports = router;
