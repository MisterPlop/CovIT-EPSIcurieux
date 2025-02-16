import { Client } from 'pg';
import { databaseConfig } from '../../../config/database';
import { CovidData } from '../../../resources/types';

export class DataRepository {
    private client: Client;

    constructor() {
        this.client = new Client({
            host: databaseConfig.host,
            port: databaseConfig.port,
            database: databaseConfig.database,
            user: databaseConfig.user,
            password: databaseConfig.password
        });
        
        this.client.connect()
            .then(() => {
            console.log('Successfully connected to the database');
            })
            .catch(err => {
            console.error('Failed to connect to database:', err);
            });
    }

    async getCovidDataByCountry(country: string) {
        const query = `
            SELECT * FROM covid19
            WHERE country = $1;
        `;
        const values = [country];
        
        try {
            const result = await this.client.query(query, values);
            return result.rows;
        } catch (error) {
            console.error('Error executing query:', error);
            throw error;
        }
    }

    async addCovidData(covidData: CovidData): Promise<number> {
        const query = `
            INSERT INTO covid19 (country, date, population, cases, active, recovered, deaths)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id;
        `;
        const values = [
            covidData.country,
            covidData.date,
            covidData.population,
            covidData.cases,
            covidData.active,
            covidData.recovered,
            covidData.deaths
        ];

        try {
            const result = await this.client.query(query, values);
            return result.rows[0].id;
        } catch (error) {
            console.error('Error executing query:', error);
            throw error;
        }
    }

    async editCovidData(id: number, covidData: CovidData) {
        const query = `
            UPDATE covid19
            SET country = $1, date = $2, population = $3, cases = $4, active = $5, recovered = $6, deaths = $7
            WHERE id = $8;
        `;
        const values = [
            covidData.country,
            covidData.date,
            covidData.population,
            covidData.cases,
            covidData.active,
            covidData.recovered,
            covidData.deaths,
            id
        ];

        try {
            return await this.client.query(query, values);
        } catch (error) {
            console.error('Error executing query:', error);
            throw error;
        }
    }

    async deleteCovidData(id: number) {
        const query = `
            DELETE FROM covid19
            WHERE id = $1;
        `;
        const values = [id];

        try {
            return await this.client.query(query, values);
        } catch (error) {
            console.error('Error executing query:', error);
            throw error;
        }
    }
}