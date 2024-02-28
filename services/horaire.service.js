const Employe = require("../models/backOffice/employeModel");
const RendezVous = require("../models/backOffice/rendezVousModel");

function genererHoraires(jour, employe, rendezVous) {
  // Définir le début et la fin de la journée de travail de l'employé
  var debutJournee = new Date(
    jour.getFullYear(),
    jour.getMonth(),
    jour.getDate(),
    employe.debutHeure
  );
  var finJournee = new Date(
    jour.getFullYear(),
    jour.getMonth(),
    jour.getDate(),
    employe.finHeure
  );

  // Définir l'intervalle entre chaque horaire disponible (en minutes)
  var intervalle = 15;

  // Initialiser la liste des horaires disponibles
  var horairesDisponibles = [];

  // Définir l'horaire actuel comme le début de la journée de travail
  var horaireActuel = new Date(debutJournee);

  // Parcourir chaque horaire de la journée de travail
  while (horaireActuel < finJournee) {
    // Vérifier si l'horaire actuel est pendant un rendez-vous existant
    var pendantRendezVous = rendezVous.some(function (rdv) {
      // Parcourir chaque prestation du rendez-vous
      for (var i = 0; i < rdv.prestations.length; i++) {
        // Calculer le début et la fin de la prestation
        var debutRdv = new Date(
          rdv.dateRdv.getFullYear(),
          rdv.dateRdv.getMonth(),
          rdv.dateRdv.getDate(),
          rdv.prestations[i].debutHeure
        );
        var finRdv = new Date(
          debutRdv.getTime() + rdv.prestations[i].delai_detail * 60000
        );

        // Vérifier si l'horaire actuel est pendant la prestation
        if (horaireActuel >= debutRdv && horaireActuel < finRdv) {
          return true;
        }
      }

      return false;
    });

    // Si l'horaire actuel n'est pas pendant un rendez-vous, ajouter à la liste des horaires disponibles
    if (!pendantRendezVous) {
      var heures = horaireActuel.getHours().toString().padStart(2, "0");
      var minutes = horaireActuel.getMinutes().toString().padStart(2, "0");
      horairesDisponibles.push(heures + ":" + minutes);
    }

    // Passer à l'horaire suivant
    horaireActuel.setMinutes(horaireActuel.getMinutes() + intervalle);
  }

  // Retourner la liste des horaires disponibles
  return horairesDisponibles;
}
module.exports = { genererHoraires };
