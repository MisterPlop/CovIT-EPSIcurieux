import { Request, Response } from 'express';
import { DataManager } from '../manager/dataManager';
import { HttpMessages } from '../../../resources/enums';
import { AuthRequest } from '../../../middleware/auth';

const dataManager: DataManager = new DataManager();

export class DataController {

    constructor() {
    }

    async getCovidDatas(req: AuthRequest, res: Response) {
        if (!req.user || req.user.profil !== "admin"){
            res.status(401).json({ message: "Utilisateur non autorisé" });
            return;
        }
        try {
            const data = await dataManager.getCovidDatas();
            res.status(200).json(data);
        } catch (err) {
            console.error('Error getting data:', err);
            res.status(500).send(HttpMessages.ERROR_GETTING_DATA);
        }
    }

    async getCovidDataByCountry(req: AuthRequest, res: Response) {
        if (!req.user || req.user.profil !== "admin"){
            res.status(401).json({ message: "Utilisateur non autorisé" });
            return;
        }
        const country = req.query.country;
        if (country) {
            try {
                const data = await dataManager.getCovidDataByCountry(country as string);
                res.status(200).json(data);
            } catch (err) {
                console.error('Error getting data:', err);
                res.status(500).send(HttpMessages.ERROR_GETTING_DATA);
            }
        } else {
            res.status(400).send(HttpMessages.MISSING_REQUIRED_FIELDS);
        }
    }

    async addCovidData(req: AuthRequest, res: Response) : Promise<any> {
        if (!req.user || req.user.profil !== "admin"){
            res.status(401).json({ message: "Utilisateur non autorisé" });
            return;
        }
        const body = req.body;
        if (body && Array.isArray(body.covid19)) {
            try {
                const results = [];
                for (const covidData of body.covid19) {
                    const { country, date, population, cases, active, recovered, deaths } = covidData;
                    if (!country || !date || !population || !cases || !active || !recovered || !deaths) {
                        res.status(400).send(HttpMessages.MISSING_REQUIRED_FIELDS);
                    }
                    const id = await dataManager.addCovidData({ 
                        country, date, population, cases, active, recovered, deaths 
                    });
                    results.push({ id });
                }
                res.status(201).json({ 
                    results, 
                    message: HttpMessages.DATA_ADDED_SUCCESSFULLY 
                });
            } catch (err) {
                console.error('Error adding data:', err);
                res.status(500).send(HttpMessages.ERROR_ADDING_DATA);
            }
        } else {
            res.status(400).send(HttpMessages.INVALID_DATA_FORMAT);
        }
    }

    async editCovidData(req: AuthRequest, res: Response) {
        if (!req.user || req.user.profil !== "admin"){
            res.status(401).json({ message: "Utilisateur non autorisé" });
            return;
        }
        const body = req.body;
        if(body && body.covid19){
            const { id, country, date, population, cases, active, recovered, deaths } = body.covid19;
            if(id && country && date && population && cases && active && recovered && deaths){
            try {
                await dataManager.editCovidData(id,{
                country, date, population, cases, active, recovered, deaths
                });
                res.status(201).send(HttpMessages.DATA_EDITED_SUCCESSFULLY);
            } catch (err) {
                console.error('Error editing data:', err);
                res.status(500).send(HttpMessages.ERROR_EDITING_DATA);
            }
            } else {
            res.status(400).send(HttpMessages.MISSING_REQUIRED_FIELDS);
            }
        } else {
            res.status(400).send(HttpMessages.INVALID_DATA_FORMAT);    
        }
    }

    async deleteCovidData(req: AuthRequest, res: Response) {
        if (!req.user || req.user.profil !== "admin"){
            res.status(401).json({ message: "Utilisateur non autorisé" });
            return;
        }
        if(req.query.id){
            const id = parseInt(req.query.id as string);
            try {
                await dataManager.deleteCovidData(id);
                res.status(201).send(HttpMessages.DATA_DELETED_SUCCESSFULLY);
            } catch (err) {
                console.error('Error deleting data:', err);
                res.status(500).send(HttpMessages.ERROR_DELETING_DATA);
            }
        } else {
            res.status(400).send(HttpMessages.MISSING_REQUIRED_FIELDS);
        }
    }
}
