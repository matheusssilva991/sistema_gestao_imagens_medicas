const express = require("express");
const router = express.Router();

const SolicitationController = require("../controllers/SolicitationController");

const Auth = require("../middlewares/Auth");
const CheckFields = require("../middlewares/CheckFields");

/* router.get('/api/solicitations', Auth.adminAuth, SolicitationController.getSolicitations);
router.get('/api/solicitation/:id', Auth.adminAuth, SolicitationController.getSolicitation);
router.post('/api/solicitation', Auth.authDbSolicitation, CheckFields.checkSolicitationFields, SolicitationController.newSolicitation);
router.put('/api/solicitation/:id', Auth.adminAuth, SolicitationController.updateSolicitation);
router.delete('/api/solicitation/:id', Auth.adminAuth, SolicitationController.deleteSolicitation); */

router.get('/api/solicitations', SolicitationController.getSolicitations);
router.get('/api/solicitation/:id', SolicitationController.getSolicitation);
router.post('/api/solicitation', Auth.authDbSolicitation, CheckFields.checkSolicitationFields, SolicitationController.newSolicitation);
router.put('/api/solicitation/:id', SolicitationController.updateSolicitation);
router.delete('/api/solicitation/:id', SolicitationController.deleteSolicitation);

module.exports = router;
