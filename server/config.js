import dotenv from 'dotenv';

dotenv.config();

export const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/bxjs';
