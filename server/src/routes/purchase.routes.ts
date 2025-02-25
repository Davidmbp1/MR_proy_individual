// server/src/routes/purchase.routes.ts

import { Router } from 'express';
import {
  getMyPurchases,
  getPurchasesGroupedByUser,
  getPurchaseBySession,
} from '../controllers/purchase.controller';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// Ruta para obtener las compras del usuario autenticado
router.get('/my', authMiddleware, getMyPurchases);

// Ruta para obtener un resumen agrupado de compras por usuario (opcional)
router.get('/grouped', authMiddleware, getPurchasesGroupedByUser);

// Nueva ruta: obtener una compra por sessionId (requiere estar autenticado)
router.get('/by-session/:sessionId', authMiddleware, getPurchaseBySession);

export default router;
