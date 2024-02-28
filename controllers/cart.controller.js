const employeService = require("../models/backOffice/employeModel");
const genererHoraires = require("../services/horaire.service");
const RendezVous = require("../models/backOffice/rendezVousModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const getAllEmploye = async (req, res) => {
  try {
    const Employe = await employeService.find();
    return res.status(200).json({ Employe });
  } catch (error) {
    console.error("Erreur lors de la récupération des Employe :", error);
    return res.status(500).json({
      message: "Erreur serveur lors de la récupération des Employe.",
    });
  }
};
async function getHoraires(req, res) {
  const { jour, idEmploye } = req.query;
  const employe = await Employe.findById(idEmploye);
  if (!employe) {
    return res.status(404).send("Employé non trouvé");
  }
  const rendezVous = await RendezVous.find({ id_employe: idEmploye });
  const jourDate = new Date(jour);

  // Générer les horaires disponibles
  const horaires = genererHoraires(jourDate, employe, rendezVous);

  // Envoyer les horaires en réponse
  res.json(horaires);
}
const createRdv = async (req, res) => {
  try {
    const { id_utilisateur, id_employe, id_detail, dateHeureRDV, statut } =
      req.body;

    // Créer un nouveau rendez-vous
    console.log(dateHeureRDV);

    const newRdv = new RendezVous({
      id_utilisateur: new ObjectId(id_utilisateur),
      id_employe: new ObjectId(id_employe),
      id_detail: new ObjectId(id_detail),
      dateHeureRDV: dateHeureRDV, // Convertir la date en objet Date
      statut: statut,
    });

    // Enregistrer le nouveau rendez-vous dans la base de données
    const savedRdv = await newRdv.save();

    // Envoyer une réponse avec le rendez-vous enregistré
    res.json(savedRdv);
  } catch (error) {
    console.error("Erreur lors de la création du rendez-vous :", error);
    res.status(500).json({
      message: "Erreur serveur lors de la création du rendez-vous.",
    });
  }
};

module.exports = {
  getAllEmploye,
  getHoraires,
  createRdv,
  getEmployeById: (req, res, next) => {
    const employeId = req.params.id.trim();
    employeService
      .findById(employeId)
      .then((employe) => {
        if (!employe) {
          return res.status(404).json({ message: "Employé non trouvé" });
        }
        res.status(200).json(employe);
      })
      .catch((error) => res.status(400).json({ error }));
  },
};
