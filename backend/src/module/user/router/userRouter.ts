import { Router } from "express";
import { UserController } from '../controller/userController';
import { authMiddleware } from "../../../middleware/auth";

const router = Router();
const userController = new UserController();
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserLogin:
 *       type: object
 *       required:
 *         - username
 *         - password
 *         - profil
 *       properties:
 *         username:
 *           type: string
 *           description: Nom d'utilisateur unique
 *         password:
 *           type: string
 *           description: Mot de passe de l'utilisateur
 *         profil:
 *           type: string
 *           description: Profil de l'utilisateur (admin ou user)
 *           enum: [admin, user]
 *     
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: Identifiant unique de l'utilisateur
 *         username:
 *           type: string
 *           description: Nom d'utilisateur
 *         profil:
 *           type: string
 *           description: Profil de l'utilisateur
 *   
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /users/profil:
 *   get:
 *     summary: Obtenir le profil de l'utilisateur connecté
 *     description: Renvoie les informations du profil de l'utilisateur authentifié
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Profil récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Utilisateur non authentifié
 */
router.get('/profil', authMiddleware, userController.getProfil);

/**
 * @swagger
 * /users/getAllUsers:
 *   get:
 *     summary: Obtenir tous les utilisateurs
 *     description: Permet à un administrateur de récupérer la liste de tous les utilisateurs
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Liste des utilisateurs récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Non autorisé - L'utilisateur n'est pas admin
 *       500:
 *         description: Erreur serveur
 */
router.get('/getAllUsers', authMiddleware, userController.getAllUsers);

/**
 * @swagger
 * /users/getUserById:
 *   get:
 *     summary: Obtenir un utilisateur par son ID
 *     description: Permet à un administrateur de récupérer les informations d'un utilisateur spécifique
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Users
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur à récupérer
 *     responses:
 *       200:
 *         description: Utilisateur récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: ID manquant
 *       401:
 *         description: Non autorisé - L'utilisateur n'est pas admin
 *       500:
 *         description: Erreur serveur
 */
router.get('/getUserById', authMiddleware, userController.getUserById);

/**
 * @swagger
 * /users/updateUserById:
 *   put:
 *     summary: Mettre à jour un utilisateur
 *     description: Permet à un administrateur de modifier les informations d'un utilisateur
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Users
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur à modifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       201:
 *         description: Utilisateur modifié avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 result:
 *                   type: object
 *       400:
 *         description: ID manquant ou données invalides
 *       401:
 *         description: Non autorisé - L'utilisateur n'est pas admin
 *       500:
 *         description: Erreur serveur
 */

router.put('/updateUserById', authMiddleware, userController.updateUserById);

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Créer un nouvel utilisateur
 *     description: Permet à un administrateur de créer un nouvel utilisateur
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 token:
 *                   type: string
 *       401:
 *         description: Non autorisé - L'utilisateur n'est pas admin
 *       400:
 *         description: Données invalides ou utilisateur déjà existant
 *       500:
 *         description: Erreur serveur
 */
router.post('/register', authMiddleware, userController.register);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Connexion utilisateur
 *     description: Authentifie un utilisateur et renvoie un token JWT
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Connexion réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Identifiants invalides
 *       500:
 *         description: Erreur serveur
 */
router.post('/login', userController.login);

/**
 * @swagger
 * /users/deleteUser:
 *   delete:
 *     summary: Supprimer un utilisateur
 *     description: Permet à un administrateur de supprimer un utilisateur
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Users
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur à supprimer
 *     responses:
 *       201:
 *         description: Utilisateur supprimé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: ID manquant
 *       401:
 *         description: Non autorisé - L'utilisateur n'est pas admin
 *       500:
 *         description: Erreur serveur
 */
router.delete('/deleteUser', authMiddleware, userController.deleteUser);

export default router;
