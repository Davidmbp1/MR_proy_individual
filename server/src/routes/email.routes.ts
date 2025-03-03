// server/src/routes/email.routes.ts
import { Router } from 'express';
import { sendTestEmail } from '../controllers/email.controller';

const router = Router();

router.post('/send', sendTestEmail);

export default router;
