const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const role_EmployeSchema = mongoose.Schema({
    nom_role : String
})
module.exports = mongoose.model('role_employe',role_EmployeSchema,'Role_employe');