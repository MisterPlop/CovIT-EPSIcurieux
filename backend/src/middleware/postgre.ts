import { Client } from 'pg';
import { databaseConfig } from '../config/database';

export class PostgreMiddleware {
    private static instance: PostgreMiddleware;
    private client: Client;

    private constructor() {
        this.client = new Client({
            host: databaseConfig.host,
            port: databaseConfig.port,
            database: databaseConfig.database,
            user: databaseConfig.user,
            password: databaseConfig.password
        });

        this.client.connect()
            .then(() => console.log('Successfully connected to the database'))
            .catch(err => console.error('Failed to connect to database:', err));
    }

    public static getInstance(): PostgreMiddleware {
        if (!PostgreMiddleware.instance) {
            PostgreMiddleware.instance = new PostgreMiddleware();
        }
        return PostgreMiddleware.instance;
    }

    public getClient(): Client {
        return this.client;
    }
}