import express from "express";
import { 
    getCovidData, 
    getCovidStats, 
    createCovidEntry, 
    updateCovidEntry, 
    deleteCovidEntry 
} from "../controllers/covidController.js"; // Vérifie bien le chemin !

const router = express.Router();


router.get("/", getCovidData); // Récupérer les données Covid avec filtres et pagination
router.get("/stats", getCovidStats); // Récupérer les statistiques globales
router.post("/", createCovidEntry); // Ajouter une nouvelle entrée
router.put("/:id", updateCovidEntry); // Modifier une entrée existante
router.delete("/:id", deleteCovidEntry); // Supprimer une entrée

export default router;
