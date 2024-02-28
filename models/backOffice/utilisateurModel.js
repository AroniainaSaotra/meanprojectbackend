const mongoose = require('mongoose');
const utilisateurSchema = mongoose.Schema({
    name:String,
    mdp:String,
    sexe: String,
    mail : String
})
module.exports = mongoose.model('utilisateur',utilisateurSchema,'Utilisateur');
