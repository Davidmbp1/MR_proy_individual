import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';

import logger from './config/logger';
import { connectDB } from './config/database';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import restaurantRoutes from './routes/restaurant.routes';
import checkoutRoutes from './routes/checkout.routes';
import webhookRoutes from './routes/webhook.routes';
import purchaseRoutes from './routes/purchase.routes';

dotenv.config();
const PORT = process.env.PORT || 4000;

// LEEMOS FRONTEND_URL desde .env
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

async function main() {
  await connectDB();

  const app = express();

  // Configuramos Helmet para permitir carga cross-origin de imágenes
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    })
  );

  // Configuramos CORS para que solo acepte peticiones desde FRONTEND_URL
  app.use(
    cors({
      origin: [FRONTEND_URL],
      credentials: true,
    })
  );

  // IMPORTANTE: webhook con express.raw() antes de express.json()
  app.use('/webhook', express.raw({ type: 'application/json' }));
  app.use('/webhook', webhookRoutes);

  // Middleware global para parsear JSON
  app.use(express.json());

  // Servimos /uploads como estático (donde multer guarda imágenes)
  app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

  // Rutas principales
  app.use('/api/auth', authRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/restaurants', restaurantRoutes);
  app.use('/api/checkout', checkoutRoutes);
  app.use('/api/purchases', purchaseRoutes);

  // Ruta raíz
  app.get('/', (req, res) => {
    res.send('Bienvenido a la API de Last Minute Foods!');
  });

  // Iniciamos el servidor
  app.listen(PORT, () => {
    logger.info(`Servidor escuchando en http://localhost:${PORT}`);
  });
}

main().catch((err) => {
  console.error('Error al iniciar la app:', err);
});
