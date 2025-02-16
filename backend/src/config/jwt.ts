import { config } from 'dotenv';
config();

export const JWT_SECRET = process.env.JWT_SECRET || "c'estpasfaux";
export const JWT_EXPIRES_IN = '24h';
