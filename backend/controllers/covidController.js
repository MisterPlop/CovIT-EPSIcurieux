import { Op, Sequelize } from "sequelize";
import sequelize from "../config/database.js";
import Covid19 from "../models/Covid19.js"; 

// Récupérer les données Covid
export const getCovidData = async (req, res) => {
    try {
        console.log("📌 Requête complète reçue :", req.query);
        const { start_date, end_date, limit = 10 } = req.query;

        if (!start_date || !end_date) {
            console.error("❌ Paramètres manquants :", { start_date, end_date });
            return res.status(400).json({ error: "Les paramètres start_date et end_date sont requis." });
        }

        const startDateFormatted = new Date(start_date).toISOString().split("T")[0];
        const endDateFormatted = new Date(end_date).toISOString().split("T")[0];

        console.log("✅ Dates formatées pour PostgreSQL :", startDateFormatted, endDateFormatted);

        const data = await Covid19.findAll({
            where: {
                date_reported: {
                    [Op.between]: [startDateFormatted, endDateFormatted],
                },
            },
            order: [["date_reported", "DESC"]],
            limit: parseInt(limit),
        });

        console.log("✅ Données récupérées avec filtre :", data);
        res.json(data);
    } catch (error) {
        console.error("❌ Erreur serveur :", error);
        res.status(500).json({ error: "Erreur serveur", details: error.message });
    }
};

// Récupérer des statistiques
export const getCovidStats = async (req, res) => {
    try {
        const stats = await Covid19.findAll({
            attributes: [
                [Covid19.sequelize.fn("SUM", Covid19.sequelize.col("confirmed_cases")), "total_cases"],
                [Covid19.sequelize.fn("SUM", Covid19.sequelize.col("deaths_reported")), "total_deaths"],
                [Covid19.sequelize.fn("SUM", Covid19.sequelize.col("recovered_cases")), "total_recoveries"],
                [Covid19.sequelize.fn("AVG", Covid19.sequelize.col("deaths_per_100_cases")), "avg_death_rate"],
                [Covid19.sequelize.fn("AVG", Covid19.sequelize.col("recovered_per_100_cases")), "avg_recovery_rate"],
            ],
        });

        console.log("✅ Statistiques récupérées :", stats);
        res.json(stats[0]);  
    } catch (error) {
        console.error("❌ Erreur lors de la récupération des statistiques :", error);
        res.status(500).json({ error: "Erreur serveur", details: error.message });
    }
};

// Ajouter une nouvelle entrée
export const createCovidEntry = async (req, res) => {
    try {
        const newData = await Covid19.create(req.body);
        res.status(201).json(newData);
    } catch (error) {
        console.error("❌ Erreur lors de l'ajout :", error);
        res.status(500).json({
            error: "Erreur serveur",
            details: error.errors ? error.errors.map(e => e.message) : error.message, 
        });
    }
};

// Modifier une entrée existante
export const updateCovidEntry = async (req, res) => {
    try {
        const { id } = req.params;

        // Vérifie si l'entrée existe avant de mettre à jour
        const entry = await Covid19.findByPk(id);
        if (!entry) {
            return res.status(404).json({ error: "Entrée non trouvée" });
        }

        // Met à jour uniquement les champs envoyés dans req.body
        await entry.update(req.body);

        res.json({ message: "Entrée mise à jour", updatedEntry: entry });
    } catch (error) {
        console.error("❌ Erreur lors de la modification :", error);
        res.status(500).json({ error: "Erreur serveur", details: error.message });
    }
};


// Supprimer une entrée
export const deleteCovidEntry = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Covid19.destroy({ where: { id } });

        if (!deleted) return res.status(404).json({ error: "Entrée non trouvée" });

        res.json({ message: "Entrée supprimée" });
    } catch (error) {
        console.error("❌ Erreur lors de la suppression :", error);
        res.status(500).json({ error: "Erreur serveur", details: error.message });
    }
};
