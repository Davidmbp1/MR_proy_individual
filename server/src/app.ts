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

// Define los orígenes permitidos (puedes usar expresiones regulares o simples comparaciones)
const allowedFrontends = [
  'https://mr-proy-individual.vercel.app',
  'https://mr-proy-individual-7eh962xtj-david-bustos-projects.vercel.app',
  'https://mr-proy-individual-git-main-david-bustos-projects.vercel.app'
];

export async function createApp() {
  await connectDB();

  const app = express();

  // Configurar Helmet para seguridad (incluyendo política cross-origin)
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    })
  );

  // Configurar CORS de forma dinámica según el origen de la petición
  app.use(
    cors({
      origin: (origin, callback) => {
        // Permitir peticiones sin origen (por ejemplo, desde herramientas o llamadas server-to-server)
        if (!origin) return callback(null, true);
        // Si el origen coincide exactamente con alguno de los permitidos, se lo acepta
        if (allowedFrontends.includes(origin)) {
          return callback(null, origin);
        }
        // De lo contrario, se rechaza la petición
        return callback(new Error(`Not allowed by CORS: ${origin}`));
      },
      credentials: true,
    })
  );

  // Middleware para el webhook (se monta antes de express.json())
  app.use('/webhook', express.raw({ type: 'application/json' }));
  app.use('/webhook', webhookRoutes);

  // Middleware para parsear JSON
  app.use(express.json());

  // Servir archivos estáticos (por ejemplo, imágenes subidas con Multer)
  app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

  // Rutas de la API
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
