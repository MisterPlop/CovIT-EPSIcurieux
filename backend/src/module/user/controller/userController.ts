import { Request, Response } from 'express';
import { UserManager } from '../manager/userManager';
import { UserLogin } from '../../../resources/types';
import { AuthRequest } from '../../../middleware/auth';

const userManager: UserManager = new UserManager();


export class UserController {

    constructor() {
    }

    async register (req: AuthRequest, res: Response) {
        if (!req.user || req.user.profil !== "admin"){
            res.status(401).json({ message: "Utilisateur non autorisé" });
            return;
        }
        try {
            const userData: UserLogin = req.body;
            const result = await userManager.register(userData);
            res.status(201).json(result);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Erreur serveur' });
            }
        }
    };

    async login (req: Request, res: Response) {
        try {
            const credentials: UserLogin = req.body;
            const result = await userManager.login(credentials);
            res.status(200).json(result);
        } catch (error) {
            if (error instanceof Error) {
                res.status(401).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Erreur serveur' });
            }
        }
    };

    getProfil(req: AuthRequest, res: Response) {
        if (!req.user) {
            res.status(401).json({ message: "Utilisateur non authentifié" });
            return;
        }
        res.json({
            message: "Profil utilisateur récupéré avec succès",
            user: {
                id: req.user.id,
                username: req.user.username,
                profil : req.user.profil
            }
        });
    }

    async getAllUsers(req: AuthRequest, res: Response) {
        if (!req.user || req.user.profil !== "admin"){
            res.status(401).json({ message: "Utilisateur non autorisé" });
            return;
        }
        try{
            const result = await userManager.getAllUsers();
            res.status(200).json(result);
        } catch (error) {
            if (error instanceof Error) {
                res.status(401).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Erreur serveur' });
            }
        }
    }

    async getUserById(req: AuthRequest, res: Response) {
        if (!req.user || req.user.profil !== "admin"){
            res.status(401).json({ message: "Utilisateur non autorisé" });
            return;
        }
        if(!req.query.id){
            res.status(400).json({ message: "Id manquant" });
            return;
        }
        const id = req.query.id as string;
        try{
            const result = await userManager.getUserById(id);
            res.status(200).json(result);
        } catch (error) {
            if (error instanceof Error) {
                res.status(401).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Erreur serveur' });
            }
        }
    }
    
    async deleteUser(req: AuthRequest, res: Response) {
        if (!req.user || req.user.profil !== "admin"){
            res.status(401).json({ message: "Utilisateur non autorisé" });
            return;
        }
        if(!req.query.id){
            res.status(400).json({ message: "Id manquant" });
            return;
        }
        const id = req.query.id as string;
        try{
            await userManager.deleteUser(id);
            res.status(201).json({ message: "Utilisateur supprimé avec succès" });
        } catch (error) {
            if (error instanceof Error) {
                res.status(401).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Erreur serveur' });
            }
        }
    }

    async updateUserById(req: AuthRequest, res: Response) {
        if (!req.user || req.user.profil !== "admin"){
            res.status(401).json({ message: "Utilisateur non autorisé" });
            return;
        }
        if(!req.query.id){
            res.status(400).json({ message: "Id manquant" });
            return;
        }
        const id = req.query.id as string;
        const userData: UserLogin = req.body;
        try{
            const result = await userManager.updateUserById(id, userData);
            res.status(201).json({ message: "Utilisateur modifié avec succès" , result});
        } catch (error) {
            if (error instanceof Error) {
                res.status(401).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Erreur serveur' });
            }
        }
    }
}