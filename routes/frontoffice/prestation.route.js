const express = require("express");
const router = express.Router();
const prestationsController = require("../../controllers/prestation.controller");

// Route pour afficher toutes les prestations
router.get("/prestations", prestationsController.getAllPrestations);
router.get(
  "/sousprestations/:id_service",
  prestationsController.getSousPrestationsById
);
router.get("/sousprestations", prestationsController.getAllSousPrestations);
router.get("/sousservices/:id", prestationsController.getSousServiceById);
module.exports = router;
