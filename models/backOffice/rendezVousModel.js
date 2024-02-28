const mongoose = require('mongoose');
const employeModel = require('./employeModel');
const utilisateurModel = require('./utilisateurModel');
const sousServicesModel = require('./sousServicesModel');
const ObjectId = mongoose.Types.ObjectId;
const rendezVousSchema = mongoose.Schema({
    id_detail:{
       type : ObjectId,
       ref:sousServicesModel
    },
    id_utilisateur: {
        type: ObjectId,
        ref:utilisateurModel
    },
    id_employe : {
        type:ObjectId,
        ref:employeModel
    },
    dateHeureRDV: Date,
    statut : String

})
module.exports = mongoose.model('rendez-vous',rendezVousSchema,'Rendez-vous');