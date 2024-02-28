const { request, response } = require('express');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId

const Employe = require('../../models/backOffice/employeModel');
const RendezVous = require('../../models/backOffice/rendezVousModel');
const Services = require('../../models/backOffice/servicesModel');
const ServiceDetail = require('../../models/backOffice/sousServicesModel');

// Route pour récupérer la liste de tous les services
router.get('/listeServices', async (request, response) => {
    try {
        const services = await Services.find();
        return response.status(200).json( services );
    } catch (error) {
        return response.status(500).json({ message: "Erreur serveur.", error: error.message });
    }
});

// Route pour modifier les champs dans les collections Services et Services_Details
router.put('/modifier-services', async (request, response) => {
    try {
        const { serviceId, libelleService, descriptionService } = request.body.services;
        const { serviceDetailId, libelleDetail, detail, prixDetail, commission,delaiDetail } = request.body.serviceDetails;

        // Mise à jour du service
        await Services.findByIdAndUpdate(serviceId, {
            libelle_services: libelleService,
            description_service: descriptionService
        });

        // Mise à jour du détail du service
        await ServiceDetail.findByIdAndUpdate(serviceDetailId, {
            libelle_detail: libelleDetail,
            description_detail: detail,
            prix_detail: prixDetail,
            commission: commission,
            delai_detail: delaiDetail
        });

        return response.status(200).json({ message: "Champs modifiés avec succès." });
    } catch (error) {
        return response.status(500).json({ message: "Erreur serveur.", error: error.message });
    }
});


// route pour modifier services
router.post('/modifyService/:idService', async (request, response) => {
    try {
        const idService = request.params.idService;

        const { libelle_service ,description_service } = request.body;

        let services = await Services.findById(new ObjectId(idService));

        services.libelle_service = libelle_service;
        services.description_service = description_service;
        
        await services.save();
        return response.status(200).json({ message: "Description services modifie ", services });
    } catch (error) {
        return response.status(500).json({ message: "Erreur serveur.", esrror: error.message });
    }
  });

  //get liste service by idService
  router.get('/listeServicesById/:idService', async (request, response) => {
    try {
        const id = request.params.idService;
        const services = await Services.findById(new ObjectId(id));
        return response.status(200).json( services );
    } catch (error) {
        return response.status(500).json({ message: "Erreur serveur.", error: error.message });
    }
});


module.exports = router;