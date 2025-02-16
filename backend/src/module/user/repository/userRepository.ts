import { Client } from 'pg';
import { PostgreMiddleware } from '../../../middleware/postgre';
import { User, UserLogin} from '../../../resources/types';

export class UserRepository {
    private client: Client;
    constructor() {
        this.client = PostgreMiddleware.getInstance().getClient();
    }

    async createUser(user: UserLogin): Promise<User> {
        const query = `
            INSERT INTO users (username, password_hash, profil)
            VALUES ($1, $2, $3)
            RETURNING *
        `;
        const result = await this.client.query(query, [user.username, user.password, user.profil]);
        return result.rows[0];
    }

    async findByUsername(username: string): Promise<User | null> {
        const query = 'SELECT * FROM users WHERE username = $1';
        const result = await this.client.query(query, [username]);
        return result.rows[0] || null;
    }

    async getAllUsers(): Promise<User[]> {
        const query = 'SELECT * FROM users';
        const result = await this.client.query(query);
        return result.rows;
    }

    async getUserById(id: string): Promise<User> {      
        const query = 'SELECT * FROM users WHERE id = $1';
        const result = await this.client.query(query, [id]);
        return result.rows[0];
    }

    async deleteUser(id: string): Promise<void> {
        const query = 'DELETE FROM users WHERE id = $1';
        await this.client.query(query, [id]);
    }

    async updateUserById(id: string, userData: UserLogin): Promise<User> {
        const query = `
            UPDATE users
            SET username = $1, password_hash = $2, profil = $3
            WHERE id = $4
            RETURNING *
        `;
        const result = await this.client.query(query, [userData.username, userData.password, userData.profil, id]);
        return result.rows[0];
    }
}
