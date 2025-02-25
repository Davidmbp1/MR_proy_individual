// server/src/routes/purchase.routes.ts

import { Router } from 'express';
import {
  getMyPurchases,
  getPurchasesGroupedByUser,
  getPurchaseBySession,
} from '../controllers/purchase.controller';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.get('/my', authMiddleware, getMyPurchases);

router.get('/grouped', authMiddleware, getPurchasesGroupedByUser);

router.get('/by-session/:sessionId', authMiddleware, getPurchaseBySession);

export default router;
