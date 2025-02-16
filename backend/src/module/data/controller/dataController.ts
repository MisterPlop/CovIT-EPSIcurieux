import { Request, Response } from 'express';
import { DataManager } from '../manager/dataManager';
import { HttpMessages } from '../../../resources/enums';

const dataManager: DataManager = new DataManager();

export class DataController {

    constructor() {
    }

    async getCovidDataByCountry(req: Request, res: Response) {
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

    async addCovidData(req: Request, res: Response) : Promise<any> {
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
                return res.status(201).json({ 
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

    async editCovidData(req: Request, res: Response) {
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

    async deleteCovidData(req: Request, res: Response) {
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
