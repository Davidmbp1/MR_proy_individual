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

// Lista de URLs permitidos para el frontend
const allowedFrontends = [
  'https://mr-proy-individual.vercel.app',
  'https://mr-proy-individual-7eh962xtj-david-bustos-projects.vercel.app',
  'https://mr-proy-individual-git-main-david-bustos-projects.vercel.app'
];

export async function createApp() {
  await connectDB();

  const app = express();

  // Helmet con política cross-origin
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    })
  );

  // Configuración de CORS
  app.use(
    cors({
      origin: (origin, callback) => {
        // Permitir peticiones sin origen (por ejemplo, herramientas de testing o llamadas server-to-server)
        if (!origin) return callback(null, true);
        // Si el origen está en la lista de permitidos, lo acepta
        if (allowedFrontends.includes(origin)) {
          return callback(null, true);
        }
        // En caso contrario, rechaza la petición
        return callback(new Error('Not allowed by CORS'));
      },
      credentials: true,
    })
  );

  // Middleware para el webhook: se monta antes del body-parser JSON
  app.use('/webhook', express.raw({ type: 'application/json' }));
  app.use('/webhook', webhookRoutes);

  // Middleware para parsear JSON en el resto de rutas
  app.use(express.json());

  // Servir archivos estáticos (por ejemplo, imágenes subidas por Multer)
  app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

  // Montar las rutas de la API
  app.use('/api/auth', authRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/restaurants', restaurantRoutes);
  app.use('/api/checkout', checkoutRoutes);
  app.use('/api/purchases', purchaseRoutes);
  app.use('/api/reviews', reviewRoutes);
  app.use('/api/emails', emailRoutes);

  // Ruta raíz
  app.get('/', (req, res) => {
    res.send('Bienvenido a la API de Last Minute Foods!');
  });

  return app;
}
