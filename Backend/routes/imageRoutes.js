const express = require("express");
const router = express.Router();

const DatabaseController = require("../controllers/DatabaseController");

const Auth = require("../middlewares/Auth");
const CheckFields = require("../middlewares/CheckFields");

/* router.get('/api/databases/images', Auth.loginAuth, DatabaseController.getImages);
router.get('/api/database/:databaseName/images', Auth.loginAuth, DatabaseController.getImages); */

router.get('/api/databases/images', DatabaseController.getImages);
router.get('/api/database/:databaseName/images', DatabaseController.getImages);

module.exports = router;
