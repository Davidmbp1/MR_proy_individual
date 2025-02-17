// server/src/index.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { connectDB } from './config/database';
import authRoutes from './routes/auth.routes';
import logger from './config/logger';

dotenv.config();

const PORT = process.env.PORT || 4000;

async function main() {
  await connectDB(); // conecta a MongoDB

  const app = express();
  app.use(helmet());
  app.use(cors());
  app.use(express.json());

  // Rutas de autenticación
  app.use('/api/auth', authRoutes);

  // Ruta de prueba
  app.get('/', (req, res) => {
    res.send('Bienvenido a la API de Last Minute Foods!');
  });

  app.listen(PORT, () => {
    logger.info(`Servidor escuchando en http://localhost:${PORT}`);
  });
}

main().catch(err => {
  console.error('Error al iniciar la app:', err);
});
