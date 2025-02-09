import { Router } from "express";
import { 
    getCovidData, 
    getCovidStats, 
    createCovidEntry, 
    updateCovidEntry, 
    deleteCovidEntry 
} from "../controllers/covidController.js";
import { validateCovidData } from "../middlewares/validateCovidData.js";

const router = Router();

/**
 * @swagger
 * /api/covid19:
 *   get:
 *     summary: Récupérer les données Covid
 *     parameters:
 *       - name: start_date
 *         in: query
 *         description: Date de début (YYYY-MM-DD)
 *         required: true
 *         schema:
 *           type: string
 *       - name: end_date
 *         in: query
 *         description: Date de fin (YYYY-MM-DD)
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Liste des données Covid
 *       400:
 *         description: Paramètres invalides
 */
router.get("/", getCovidData);

/**
 * @swagger
 * /api/covid19/stats:
 *   get:
 *     summary: Obtenir des statistiques globales
 *     responses:
 *       200:
 *         description: Retourne les statistiques globales du Covid
 */
router.get("/stats", getCovidStats);

/**
 * @swagger
 * /api/covid19/add-data:
 *   post:
 *     summary: Ajouter une nouvelle entrée Covid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date_reported:
 *                 type: string
 *                 example: "2024-02-01"
 *               confirmed_cases:
 *                 type: integer
 *                 example: 1000
 *               deaths_reported:
 *                 type: integer
 *                 example: 10
 *               recovered_cases:
 *                 type: integer
 *                 example: 900
 *     responses:
 *       201:
 *         description: Entrée ajoutée avec succès
 *       500:
 *         description: Erreur serveur
 */
router.post("/add-data", validateCovidData, createCovidEntry);

/**
 * @swagger
 * /api/covid19/update-data/{id}:
 *   put:
 *     summary: Modifier une entrée Covid existante
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de l'entrée à mettre à jour
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               confirmed_cases:
 *                 type: integer
 *                 example: 1200
 *               deaths_reported:
 *                 type: integer
 *                 example: 12
 *     responses:
 *       200:
 *         description: Entrée mise à jour avec succès
 *       404:
 *         description: Entrée non trouvée
 */
router.put("/update-data/:id", validateCovidData, updateCovidEntry);

/**
 * @swagger
 * /api/covid19/delete-data/{id}:
 *   delete:
 *     summary: Supprimer une entrée Covid
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de l'entrée à supprimer
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Entrée supprimée avec succès
 *       404:
 *         description: Entrée non trouvée
 */
router.delete("/delete-data/:id", deleteCovidEntry);

export default router;