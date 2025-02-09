import { Op, Sequelize } from "sequelize";
import Covid19 from "../models/Covid19.js"; 

export const getCovidData = async (req, res) => {
    try {
        const { start_date, end_date, limit = 10 } = req.query;

        console.log("📌 Requête reçue avec :", { start_date, end_date, limit });

        if (!start_date || !end_date) {
            return res.status(400).json({ error: "Les paramètres start_date et end_date sont requis." });
        }

        const startDateFormatted = new Date(start_date).toISOString().split("T")[0];
        const endDateFormatted = new Date(end_date).toISOString().split("T")[0];

        console.log("✅ Dates formatées :", startDateFormatted, endDateFormatted);

        // 🔥 Forcer Sequelize à exécuter la requête correctement
        const data = await Covid19.findAll({
            where: Sequelize.literal(`date_reported BETWEEN '${startDateFormatted}' AND '${endDateFormatted}'`),
            order: [["date_reported", "DESC"]],
            limit: parseInt(limit),
        });

        console.log("✅ Données récupérées :", data);
        res.json(data);
    } catch (error) {
        console.error("❌ Erreur serveur :", error);
        res.status(500).json({ error: "Erreur serveur", details: error.message });
    }
};


// 📌 Récupérer des statistiques globales
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
