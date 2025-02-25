// server/src/index.ts
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import http from 'http';
import { Server } from 'socket.io';

import logger from './config/logger';
import { connectDB } from './config/database';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import restaurantRoutes from './routes/restaurant.routes';
import checkoutRoutes from './routes/checkout.routes';
import webhookRoutes from './routes/webhook.routes';
import purchaseRoutes from './routes/purchase.routes';
import reviewRoutes from './routes/review.routes';
import emailRoutes from './routes/email.routes';

dotenv.config();
const PORT = process.env.PORT || 4000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

async function main() {
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

  // Middleware para el webhook (antes de express.json)
  app.use('/webhook', express.raw({ type: 'application/json' }));
  app.use('/webhook', webhookRoutes);

  app.use(express.json());

  // Servir archivos estáticos en /uploads
  app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

  // Rutas principales
  app.use('/api/auth', authRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/restaurants', restaurantRoutes);
  app.use('/api/checkout', checkoutRoutes);
  app.use('/api/purchases', purchaseRoutes);
  app.use('/api/reviews', reviewRoutes);
  app.use('/api/emails', emailRoutes);  // Ruta de correos

  app.get('/', (req, res) => {
    res.send('Bienvenido a la API de Last Minute Foods!');
  });

  // Creamos un servidor HTTP para usar con Socket.IO
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: FRONTEND_URL,
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  // Guardamos la instancia de Socket.IO en la app para usarla en controladores
  app.set('socketio', io);

  server.listen(PORT, () => {
    logger.info(`Servidor escuchando en http://localhost:${PORT}`);
  });
}

main().catch((err) => {
  console.error('Error al iniciar la app:', err);
});
