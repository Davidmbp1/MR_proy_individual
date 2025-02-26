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

// Define los orígenes permitidos: usa la variable de entorno FRONTEND_URL y agrega tu dominio de producción
const FRONTEND_URL = process.env.FRONTEND_URL;
const allowedOrigins = [
  FRONTEND_URL,
  'https://mr-proy-individual.vercel.app'
];

export async function createApp() {
  await connectDB();

  const app = express();

  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    })
  );

  // Configura CORS permitiendo los orígenes definidos
  app.use(
    cors({
      origin: (origin, callback) => {
        // Permitir solicitudes sin origin (por ejemplo, desde herramientas de testing)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
          return callback(null, true);
        } else {
          return callback(new Error(`Origin ${origin} not allowed by CORS`));
        }
      },
      credentials: true,
    })
  );

  // Middleware para webhook (raw body)
  app.use('/webhook', express.raw({ type: 'application/json' }));
  app.use('/webhook', webhookRoutes);

  // Middleware para parsear JSON
  app.use(express.json());

  // Sirve archivos estáticos (por ejemplo, imágenes subidas)
  app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

  // Rutas de la API
  app.use('/api/auth', authRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/restaurants', restaurantRoutes);
  app.use('/api/checkout', checkoutRoutes);
  app.use('/api/purchases', purchaseRoutes);
  app.use('/api/reviews', reviewRoutes);
  app.use('/api/emails', emailRoutes);

  // Ruta raíz de prueba
  app.get('/', (req, res) => {
    res.send('Bienvenido a la API de Last Minute Foods!');
  });

  return app;
}
