// server/src/routes/webhook.routes.ts

import express from 'express';
import { stripeWebhook } from '../controllers/webhook.controller';

const router = express.Router();

router.post(
  '/stripe',
  express.raw({ type: 'application/json' }),
  stripeWebhook
);

export default router;
