import { Op, Sequelize } from "sequelize";
import sequelize from "../config/database.js";
import Covid19 from "../models/Covid19.js";
import Joi from "joi";

// Vérifier la connexion Sequelize au démarrage
(async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ Connexion à PostgreSQL réussie !");
    } catch (error) {
        console.error("❌ Erreur de connexion à PostgreSQL :", error);
    }
})();

// Schéma de validation des entrées
const covidSchema = Joi.object({
    date_reported: Joi.date().iso().required(),
    confirmed_cases: Joi.number().integer().min(0).required(),
    deaths_reported: Joi.number().integer().min(0).required(),
    recovered_cases: Joi.number().integer().min(0).required(),
});

// Récupérer les données Covid avec filtres et pagination
export const getCovidData = async (req, res) => {
    try {
        console.log("📌 Requête complète reçue :", req.query);
        const { start_date, end_date, limit = 10, page = 1 } = req.query;

        if (!start_date || !end_date) {
            console.error("❌ Paramètres manquants :", { start_date, end_date });
            return res.status(400).json({ error: "Les paramètres start_date et end_date sont requis." });
        }

        const startDateFormatted = new Date(start_date).toISOString().split("T")[0];
        const endDateFormatted = new Date(end_date).toISOString().split("T")[0];
        const offset = (parseInt(page) - 1) * parseInt(limit);

        console.log("✅ Dates formatées :", startDateFormatted, endDateFormatted);

        const data = await Covid19.findAll({
            where: { date_reported: { [Op.between]: [startDateFormatted, endDateFormatted] } },
            order: [["date_reported", "DESC"]],
            limit: parseInt(limit),
            offset: offset,
        });

        console.log("✅ Données récupérées :", data);
        res.json(data);
    } catch (error) {
        console.error("❌ Erreur serveur :", error);
        res.status(500).json({ error: "Erreur serveur", details: error.message });
    }
};

// Récupérer les statistiques globales optimisées
export const getCovidStats = async (req, res) => {
    try {
        const stats = await Covid19.findOne({
            attributes: [
                [Sequelize.fn("SUM", Sequelize.col("confirmed_cases")), "total_cases"],
                [Sequelize.fn("SUM", Sequelize.col("deaths_reported")), "total_deaths"],
                [Sequelize.fn("SUM", Sequelize.col("recovered_cases")), "total_recoveries"],
                [Sequelize.fn("AVG", Sequelize.col("deaths_per_100_cases")), "avg_death_rate"],
                [Sequelize.fn("AVG", Sequelize.col("recovered_per_100_cases")), "avg_recovery_rate"],
            ],
            raw: true,
        });
        
        console.log("✅ Statistiques récupérées :", stats);
        res.json(stats);
    } catch (error) {
        console.error("❌ Erreur lors de la récupération des statistiques :", error);
        res.status(500).json({ error: "Erreur serveur", details: error.message });
    }
};

// Ajouter une nouvelle entrée avec validation
export const createCovidEntry = async (req, res) => {
    try {
        console.log("🆕 Tentative d'ajout :", req.body);
        const { error } = covidSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: "Validation échouée", details: error.details });
        }
        
        const newData = await Covid19.create(req.body);
        console.log("✅ Entrée ajoutée :", newData);
        res.status(201).json(newData);
    } catch (error) {
        console.error("❌ Erreur lors de l'ajout :", error);
        res.status(500).json({ error: "Erreur serveur", details: error.message });
    }
};

// Modifier une entrée existante
export const updateCovidEntry = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`🔄 Tentative de mise à jour de l'entrée ID ${id}`);

        const entry = await Covid19.findByPk(id);
        if (!entry) {
            console.error(`❌ Entrée ID ${id} non trouvée`);
            return res.status(404).json({ error: "Entrée non trouvée" });
        }

        await entry.update(req.body);
        console.log("✅ Entrée mise à jour :", entry);
        res.json({ message: "Entrée mise à jour", updatedEntry: entry });
    } catch (error) {
        console.error("❌ Erreur lors de la modification :", error);
        res.status(500).json({ error: "Erreur serveur", details: error.message });
    }
};

// Supprimer une entrée Covid19
export const deleteCovidEntry = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`🗑 Tentative de suppression de l'entrée ID ${id}`);

        const entry = await Covid19.findByPk(id);
        if (!entry) {
            console.error(`❌ Entrée ID ${id} non trouvée`);
            return res.status(404).json({ error: "Entrée non trouvée" });
        }

        await entry.destroy();
        console.log("✅ Entrée supprimée :", entry);
        res.json({ message: "Entrée supprimée" });
    } catch (error) {
        console.error("❌ Erreur lors de la suppression :", error);
        res.status(500).json({ error: "Erreur serveur", details: error.message });
    }
};
