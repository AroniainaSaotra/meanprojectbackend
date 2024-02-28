const mongoose = require('mongoose');
const roleEmployeModel = require('./roleEmployeModel');
const ObjectId = mongoose.Types.ObjectId;
const employeSchema = mongoose.Schema({
    name:String,
    mail:String,
    password: String,
    id_role : {
        type: ObjectId,
        ref: roleEmployeModel
    },
    debutHeure: Number,
    finHeure: Number,
    description: String
})
module.exports = mongoose.model('employe',employeSchema,'Employe');
