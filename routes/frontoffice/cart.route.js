const express = require("express");
const router = express.Router();
const cartController = require("../../controllers/cart.controller");

// Route pour afficher toutes les prestations
router.get("/employe", cartController.getAllEmploye);
router.get("/horaires", cartController.getHoraires);
router.post("/createrdv", cartController.createRdv);
router.get("/employe/:id", cartController.getEmployeById);
module.exports = router;
