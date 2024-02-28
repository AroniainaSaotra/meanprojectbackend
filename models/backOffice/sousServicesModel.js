const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const servicesModel = require('./servicesModel');
const sousServicesSchema = mongoose.Schema({
    id_service:{
        type : ObjectId,
        ref :servicesModel
    },
    libelle_detail:String,
    delai_detail: Number,
    prix_detail :Number,
    comission :Number,
    description_detail :String,
    note_detail : Number
})
module.exports = mongoose.model('sous-services',sousServicesSchema,'Sous-Services');
