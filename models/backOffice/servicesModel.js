const mongoose = require("mongoose");
const servicesSchema = mongoose.Schema({
  libelle_service: String,
  description_service: String,
});
module.exports = mongoose.model("services", servicesSchema, "Services");
