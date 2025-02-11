import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.routes'; // Importa rutas de auth

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || '';
const PORT = process.env.PORT || 4000;

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Conectado a MongoDB Atlas con Mongoose');
  })
  .catch(err => {
    console.error('Error al conectar con la base de datos:', err);
    process.exit(1);
  });

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rutas de autenticación
app.use('/api/auth', authRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Bienvenido a la API de Last Minute Foods en Perú!');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
