// server/src/app.ts
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { connectDB } from './config/database';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import restaurantRoutes from './routes/restaurant.routes';
import checkoutRoutes from './routes/checkout.routes';
import webhookRoutes from './routes/webhook.routes';
import purchaseRoutes from './routes/purchase.routes';
import reviewRoutes from './routes/review.routes';
import emailRoutes from './routes/email.routes';
import logger from './config/logger';

dotenv.config();
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

export async function createApp() {
  await connectDB();

  const app = express();

  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    })
  );
  app.use(
    cors({
      origin: [FRONTEND_URL],
      credentials: true,
    })
  );

  // Rutas para webhook (raw body)
  app.use('/webhook', express.raw({ type: 'application/json' }));
  app.use('/webhook', webhookRoutes);

  app.use(express.json());

  // Sirve archivos estáticos (por ejemplo, para las imágenes subidas)
  app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

  // Monta las rutas de la API
  app.use('/api/auth', authRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/restaurants', restaurantRoutes);
  app.use('/api/checkout', checkoutRoutes);
  app.use('/api/purchases', purchaseRoutes);
  app.use('/api/reviews', reviewRoutes);
  app.use('/api/emails', emailRoutes);

  app.get('/', (req, res) => {
    res.send('Bienvenido a la API de Last Minute Foods!');
  });

  return app;
}
