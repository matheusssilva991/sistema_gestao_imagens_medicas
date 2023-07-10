const express = require("express");
const router = express.Router();

const DatabaseController = require("../controllers/DatabaseController");

const Auth = require("../middlewares/Auth");
const CheckFields = require("../middlewares/CheckFields");

router.get('/api/databases', DatabaseController.getDatabases);
router.get('/api/database/:id', DatabaseController.getDatabase);
router.post('/api/database', Auth.adminAuth, CheckFields.checkEmptyFields, DatabaseController.newDatabase);
router.put('/api/database/:id', Auth.adminAuth, CheckFields.checkEmptyFields, DatabaseController.updateDatabase);
router.delete('/api/database/:id',Auth.adminAuth, DatabaseController.deleteDatabase);


module.exports = router;
