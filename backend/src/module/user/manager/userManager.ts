import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repository/userRepository';
import { UserLogin } from '../../../resources/types';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../../../config/jwt';

export class UserManager {
    private readonly SALT_ROUNDS = 12;
    private userRepository: UserRepository;
    constructor() {
        this.userRepository = new UserRepository();
    }

    async register(userData: UserLogin) {
        const existingUser = await this.userRepository.findByUsername(userData.username);
        if (existingUser) {
            throw new Error('Un utilisateur avec cet username existe déjà');
        }

        const password_hash = await bcrypt.hash(userData.password, this.SALT_ROUNDS);

        const user = await this.userRepository.createUser({
            username: userData.username,
            password: password_hash,
            profil : userData.profil
        });

        const token = this.generateToken(user);

        return { user, token };
    }

    async login(credentials: UserLogin) {
        try {
            const user = await this.userRepository.findByUsername(credentials.username);
            if (!user) {
                throw new Error('username ou mot de passe incorrect');
            }
    
            const isPasswordValid = await bcrypt.compare(
                credentials.password,
                user.password_hash
            );
    
            if (!isPasswordValid) {
                throw new Error('username ou mot de passe incorrect');
            }
    
            const token = this.generateToken(user);
            return { token };
        } catch (error) {
            console.error("Erreur dans login:", error);
            throw error;
        }
    }
    private generateToken(user: { id: number; username: string, profil: string }) {
        return jwt.sign(
            { id: user.id, username: user.username, profil: user.profil },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );
    }

    async getAllUsers() {
        try{
            const result = await this.userRepository.getAllUsers();
            return result;
        }
        catch (error) {
            console.error("Erreur dans getAllUsers:", error);
            throw error;
        }
    }

    async getUserById(id: string) {
        try{
            const result = await this.userRepository.getUserById(id);
            return result;
        }
        catch (error) {
            console.error("Erreur dans getUserByID:", error);
            throw error;
        }
    }

    async deleteUser(id: string) {
        try{
            const result = await this.userRepository.deleteUser(id);
            return result;
        }
        catch (error) {
            console.error("Erreur dans deleteUser:", error);
            throw error;
        }
    }

    async updateUserById(id: string, userData: UserLogin) {
        try{
            userData.password = await bcrypt.hash(userData.password, this.SALT_ROUNDS);
            const result = await this.userRepository.updateUserById(id, userData);
            return result;
        }
        catch (error) {
            console.error("Erreur dans updateUser:", error);
            throw error;
        }
    }
}