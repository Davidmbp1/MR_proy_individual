// server/src/routes/auth.routes.ts
import { Router } from 'express';
import { register, login, googleLogin } from '../controllers/auth.controller';
import { validateRegister, validateLogin } from '../middlewares/validateAuth';
import { authLimiter } from '../middlewares/rateLimit';

const router = Router();

// Registro con validaciones + rate limit
router.post('/register', authLimiter, validateRegister, register);

// Login con validaciones + rate limit
router.post('/login', authLimiter, validateLogin, login);

// Google login con rate limit
router.post('/google', authLimiter, googleLogin);

export default router;