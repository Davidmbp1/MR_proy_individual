// server/src/middlewares/rateLimit.ts
import rateLimit from 'express-rate-limit';

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  message: {
    message: 'Demasiados intentos, intente más tarde.'
  },
  standardHeaders: true,
  legacyHeaders: false
});
