import express from "express";
import { 
    getCovidData, 
    getCovidStats, 
    createCovidEntry, 
    updateCovidEntry, 
    deleteCovidEntry 
} from "../controllers/covidController.js";

const router = express.Router();


router.get("/get-data", getCovidData); // Récupérer les données Covid avec filtres et pagination
router.get("/get-stats", getCovidStats); // Récupérer les statistiques globales
router.post("/create-data", createCovidEntry); // Ajouter une nouvelle entrée
router.put("/change-data:id", updateCovidEntry); // Modifier une entrée existante
router.delete("/delete-data:id", deleteCovidEntry); // Supprimer une entrée

export default router;


