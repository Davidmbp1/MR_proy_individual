// server/src/routes/webhook.routes.ts

import express from 'express';
import { stripeWebhook } from '../controllers/webhook.controller';

const router = express.Router();

// Es MUY importante usar express.raw() para este endpoint, de modo que Stripe pueda verificar la firma
router.post(
  '/stripe',
  express.raw({ type: 'application/json' }),
  stripeWebhook
);

export default router;
