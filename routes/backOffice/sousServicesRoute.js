const { request, response } = require('express');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId

const Employe = require('../../models/backOffice/employeModel');
const RendezVous = require('../../models/backOffice/rendezVousModel');
const Services = require('../../models/backOffice/servicesModel');
const ServiceDetail = require('../../models/backOffice/sousServicesModel');

// Route pour récupérer la liste de tous les sous-services
router.get('/listeSousServices', async (request, response) => {
    try {
        const sous_services = await ServiceDetail.find().populate('id_service');
        return response.status(200).json(sous_services);
    } catch (error) {
        return response.status(500).json({ message: "Erreur serveur.", error: error.message });
    }
});

  //get liste sous service by idService
router.get('/listeSousServicesById/:idSousService', async (request, response) => {
    try {
        const id = request.params.idSousService;
        const sous_services = await ServiceDetail.findById(new ObjectId(id));
        return response.status(200).json( sous_services );
    } catch (error) {
        return response.status(500).json({ message: "Erreur serveur.", error: error.message });
    }
});

// route pour modifier sous-services
router.post('/modifySousService/:idSousService', async (request, response) => {
    try {
        const idService = request.params.idSousService;

        const { libelle_detail ,description_detail, delai_detail, prix_detail,comission } = request.body;

        let sousServices = await ServiceDetail.findById(new ObjectId(idService));

        sousServices.libelle_detail = libelle_detail;
        sousServices.description_detail = description_detail;
        sousServices.delai_detail = delai_detail;
        sousServices.prix_detail = prix_detail;
        sousServices.comission = comission;
        
        await sousServices.save();
        return response.status(200).json({ message: "Description sousServices modifie ", sousServices });
    } catch (error) {
        return response.status(500).json({ message: "Erreur serveur.", esrror: error.message });
    }
  });

module.exports = router;