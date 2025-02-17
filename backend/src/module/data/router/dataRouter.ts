import { Router } from "express";
import { DataController } from "../controller/dataController";
import { authMiddleware } from "../../../middleware/auth";

const router = Router();
const dataController = new DataController();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     CovidData:
 *       type: object
 *       required:
 *         - country
 *         - date
 *         - population
 *         - cases
 *         - active
 *         - recovered
 *         - deaths
 *       properties:
 *         country:
 *           type: string
 *           description: Nom du pays
 *         date:
 *           type: string
 *           format: date
 *           description: Date des données
 *         population:
 *           type: integer
 *           description: Population totale du pays
 *         cases:
 *           type: integer
 *           description: Nombre total de cas confirmés
 *         active:
 *           type: integer
 *           description: Nombre de cas actifs
 *         recovered:
 *           type: integer
 *           description: Nombre de cas guéris
 *         deaths:
 *           type: integer
 *           description: Nombre de décès
 */

/**
 * @swagger
 * tags:
 *   name: Data
 *   description: Data management
 */

/**
 * @swagger
 * /covid19/getCovidDataByCountry:
 *   get:
 *     summary: Obtenir les données COVID pour un pays spécifique
 *     security:
 *       - BearerAuth: []
 *     tags: [Data]
 *     parameters:
 *       - in: query
 *         name: country
 *         schema:
 *           type: string
 *         required: true
 *         description: Nom du pays pour lequel récupérer les données
 *     responses:
 *       200:
 *         description: Données COVID pour le pays spécifié
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CovidData'
 *       401:
 *         description: Non autorisé - Token JWT manquant ou invalide
 *       404:
 *         description: Pays non trouvé
 *       500:
 *         description: Erreur serveur interne
 */

router.get('/getCovidDataByCountry', authMiddleware, dataController.getCovidDataByCountry);

/**
 * @swagger
 * /covid19/addCovidData:
 *   post:
 *     summary: Ajouter des données COVID
 *     security:
 *       - BearerAuth: []
 *     tags: [Data]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               covid19:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/CovidData'
 *     responses:
 *       201:
 *         description: Données COVID ajoutées avec succès
 *       401:
 *         description: Non autorisé - Token JWT manquant ou invalide
 *       400:
 *         description: Requête invalide (champs manquants)
 *       500:
 *         description: Erreur lors de l'ajout des données
 */
router.post('/addCovidData', authMiddleware, dataController.addCovidData);

/**
 * @swagger
 * /covid19/editCovidData:
 *   put:
 *     summary: Mettre à jour une entrée de données COVID
 *     security:
 *       - BearerAuth: []
 *     tags: [Data]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               covid19:
 *                 type: object
 *                 allOf:
 *                   - $ref: '#/components/schemas/CovidData'
 *                   - type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: Identifiant unique de l'enregistrement à mettre à jour
 *                     required:
 *                       - id
 *     responses:
 *       200:
 *         description: Données COVID mises à jour avec succès
 *       401:
 *         description: Non autorisé - Token JWT manquant ou invalide
 *       400:
 *         description: Requête invalide (champs manquants ou données invalides)
 *       404:
 *         description: Entrée non trouvée
 *       500:
 *         description: Erreur serveur interne
 */
router.put('/editCovidData', authMiddleware, dataController.editCovidData);

/**
 * @swagger
 * /covid19/deleteCovidData:
 *   delete:
 *     summary: Supprimer une entrée de données COVID
 *     security:
 *       - BearerAuth: []
 *     tags: [Data]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'enregistrement à supprimer
 *     responses:
 *       200:
 *         description: Données COVID supprimées avec succès
 *       401:
 *         description: Non autorisé - Token JWT manquant ou invalide
 *       400:
 *         description: Requête invalide (ID invalide)
 *       404:
 *         description: Entrée non trouvée
 *       500:
 *         description: Erreur serveur interne
 */
router.delete('/deleteCovidData', authMiddleware, dataController.deleteCovidData);

export default router;
