// server/src/routes/checkout.routes.ts
import { Router } from 'express';
import { createCheckoutSession } from '../controllers/checkout.controller';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/create', authMiddleware, createCheckoutSession);

export default router;
