// server/src/config/database.ts
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || '';

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Conectado a MongoDB Atlas con Mongoose');
  } catch (error) {
    console.error('Error al conectar con MongoDB:', error);
    process.exit(1); // O comentarlo si no quieres matar el servidor en error
  }
};
