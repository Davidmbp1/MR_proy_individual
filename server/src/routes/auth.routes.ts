// server/src/routes/auth.routes.ts
import { Router } from 'express';
import { register, login, googleLogin } from '../controllers/auth.controller';
import { validateRegister, validateLogin } from '../middlewares/validateAuth';
import { authLimiter } from '../middlewares/rateLimit';

const router = Router();

router.post('/register', authLimiter, validateRegister, register);

router.post('/login', authLimiter, validateLogin, login);

router.post('/google', authLimiter, googleLogin);

export default router;