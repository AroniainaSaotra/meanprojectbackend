const { request, response } = require('express');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId

const Employe = require('../../models/backOffice/employeModel');
const RendezVous = require('../../models/backOffice/rendezVousModel');

//nb de reservation par jour / mois
/*router.get('/nbDeReservation', async (request, response) => {
    try {
        const { type } = request.body;

        let aggregateOptions;

        if (type === 'day') {
            // Agrégation par jour
            aggregateOptions = [
                {
                    $group: {
                        _id: {
                            day: { $dayOfMonth: "$dateHeureRDV" },
                            month: { $month: "$dateHeureRDV" },
                            year: { $year: "$dateHeureRDV" }
                        },
                        count: { $sum: 1 }
                    }
                }
            ];
        } else if (type === 'month') {
            // Agrégation par mois
            aggregateOptions = [
                {
                    $group: {
                        _id: {
                            month: { $month: "$dateHeureRDV" },
                            year: { $year: "$dateHeureRDV" }
                        },
                        count: { $sum: 1 }
                    }
                }
            ];
        } else {
            return response.status(400).json({ message: "Type de période invalide. Veuillez spécifier 'day' ou 'month'." });
        }

        const results = await RendezVous.aggregate(aggregateOptions);

        return response.status(200).json({ results });
    } catch (error) {
        return response.status(500).json({ message: "Erreur serveur.", error: error.message });
    }
});*/

router.post('/nbDeReservation', async (request, response) => {
    try {
        const { type } = request.body;

        let aggregateOptions;

        if (type === 'day') {
            const month = request.body.month
            // Agrégation par jour
            aggregateOptions = [
                {
                    $match: {
                        $expr: { $eq: [{ $month: "$dateHeureRDV" }, month] }
                    }
                },
                {
                    $group: {
                        _id: {
                            day: { $dayOfMonth: "$dateHeureRDV" },
                            month: { $month: "$dateHeureRDV" },
                            year: { $year: "$dateHeureRDV" }
                        },
                        count: { $sum: 1 }
                    }
                }
            ];

            const results = await RendezVous.aggregate(aggregateOptions);

            // Création d'un tableau contenant les jours du mois sélectionné
            const joursDuMois = Array.from({ length: new Date(2022, month, 0).getDate() }, (_, i) => i + 1);

            // Remplissage des valeurs de réservation po    ur chaque jour
            const reservationsParJour = joursDuMois.map(day => {
                const resultForDay = results.find(item => item._id.day === day);
                return {
                    day: day,
                    count: resultForDay ? resultForDay.count : 0
                };
            });

            return response.status(200).json( reservationsParJour );

        } else if (type === 'month') {
            // Agrégation par mois
            aggregateOptions = [
                {
                    $group: {
                        _id: {
                            month: { $month: "$dateHeureRDV" },
                            year: { $year: "$dateHeureRDV" }
                        },
                        count: { $sum: 1 }
                    }
                }
            ];
            const results = await RendezVous.aggregate(aggregateOptions);

            // Création d'un tableau contenant les douze mois de l'année
            const moisDeLAnnee = Array.from({ length: 12 }, (_, i) => i + 1);

            // Remplissage des valeurs de réservation pour chaque mois
            const reservationsParMois = moisDeLAnnee.map(month => {
                const resultForMonth = results.find(item => item._id.month === month);
                return {
                    month: month,
                    count: resultForMonth ? resultForMonth.count : 0
                };
            });
            return response.status(200).json(reservationsParMois);

        } else {
            return response.status(400).json({ message: "Type de période invalide. Veuillez spécifier 'day' ou 'month'." });
        }



        //return response.status(200).json({ reservationsParMois });
    } catch (error) {
        return response.status(500).json({ message: "Erreur serveur.", error: error.message });
    }
});


//Chiffre d'affaire par jour / mois
router.post('/chiffre-affaires', async (request, response) => {
    try {
        const { type } = request.body;

        let aggregateOptions;

        if (type === 'day') {
            // Agrégation par jour
            const month = request.body.month
            aggregateOptions = [
                {
                    $lookup: {
                        from: "Sous-Services",
                        localField: "id_detail",
                        foreignField: "_id",
                        as: "details"
                    }
                },
                {
                    $match: {
                        $expr: { $eq: [{ $month: "$dateHeureRDV" }, parseInt(month)] }
                    }
                },
                {
                    $group: {
                        _id: {
                            day: { $dayOfMonth: "$dateHeureRDV" },
                            month: { $month: "$dateHeureRDV" },
                            year: { $year: "$dateHeureRDV" }
                        },
                        chiffreAffaires: { $sum: { $sum: "$details.prix_detail" } }
                    }
                }
            ];

            const results = await RendezVous.aggregate(aggregateOptions);

            // Création d'un tableau contenant les jours du mois sélectionné
            const joursDuMois = Array.from({ length: new Date(2022, month, 0).getDate() }, (_, i) => i + 1);

            // Remplissage des valeurs de chiffre d'affaires pour chaque jour
            const chiffreAffairesParJour = joursDuMois.map(day => {
                const resultForDay = results.find(item => item._id.day === day);
                return {
                    day: day,
                    chiffreAffaires: resultForDay ? resultForDay.chiffreAffaires : 0
                };
            });

            return response.status(200).json( chiffreAffairesParJour );
        } else if (type === 'month') {
            // Agrégation par mois
            aggregateOptions = [
                {
                    $lookup: {
                        from: "Sous-Services",
                        localField: "id_detail",
                        foreignField: "_id",
                        as: "details"
                    }
                },
                {
                    $group: {
                        _id: {
                            month: { $month: "$dateHeureRDV" },
                            year: { $year: "$dateHeureRDV" }
                        },
                        chiffreAffaires: { $sum: { $sum: "$details.prix_detail" } }
                    }
                }
            ];
            const results = await RendezVous.aggregate(aggregateOptions);

            // Création d'un tableau contenant les douze mois de l'année
            const moisDeLAnnee = Array.from({ length: 12 }, (_, i) => i + 1);

            // Remplissage des valeurs de chiffre d'affaires pour chaque mois
            const chiffreAffairesParMois = moisDeLAnnee.map(month => {
                const resultForMonth = results.find(item => item._id.month === month);
                return {
                    month: month,
                    chiffreAffaires: resultForMonth ? resultForMonth.chiffreAffaires : 0
                };
            });

            return response.status(200).json( chiffreAffairesParMois );
        } else {
            return response.status(400).json({ message: "Type de période invalide. Veuillez spécifier 'day' ou 'month'." });
        }
    } catch (error) {
        return response.status(500).json({ message: "Erreur serveur.", error: error.message });
    }
});

//Benefice par mois

module.exports = router;