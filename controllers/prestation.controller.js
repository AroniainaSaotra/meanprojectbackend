const Services = require("../models/backOffice/servicesModel");
const Sous_Service = require("../models/backOffice/sousServicesModel");

const getAllPrestations = async (req, res) => {
  try {
    // Récupérer toutes les prestations depuis la base de données
    const prestations = await Services.find();
    return res.status(200).json({ prestations });
  } catch (error) {
    console.error("Erreur lors de la récupération des prestations :", error);
    return res.status(500).json({
      message: "Erreur serveur lors de la récupération des prestations.",
    });
  }
};
const getAllSousPrestations = async (req, res) => {
  try {
    // Récupérer toutes les sous-prestations depuis la base de données
    const sousprestations = await Sous_Service.find();

    return res.status(200).json({ sousprestations });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des sous_prestations :",
      error
    );
    return res.status(500).json({
      message: "Erreur serveur lors de la récupération des sous_prestations.",
    });
  }
};
const getSousServiceById = (req, res, next) => {
  const sousServiceId = req.params.id.trim();

  Sous_Service.findById(sousServiceId)
    .populate("id_service") // Pour obtenir les détails du service associé
    .then((sousService) => {
      if (!sousService) {
        return res.status(404).json({ message: "Sous-service non trouvé" });
      }
      res.status(200).json(sousService);
    })
    .catch((error) => res.status(400).json({ error }));
};
module.exports = {
  getAllPrestations,
  getAllSousPrestations,
  getSousPrestationsById: (req, res, next) => {
    Sous_Service.find({ id_service: req.params.id_service })
      .then((sousPrestations) => res.status(200).json(sousPrestations))
      .catch((error) => res.status(400).json({ error }));
  },
  getSousServiceById,
};
