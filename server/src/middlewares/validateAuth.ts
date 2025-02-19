import { RequestHandler } from 'express';
import { z } from 'zod';

// Esquema para registro
const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().optional()
});

// Esquema para login
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const validateRegister: RequestHandler = (req, res, next) => {
  try {
    registerSchema.parse(req.body);
    next();
  } catch (error: any) {
    res.status(400).json({
      message: 'Datos de registro inválidos',
      errors: error.errors
    });
    return;
  }
};

export const validateLogin: RequestHandler = (req, res, next) => {
  try {
    loginSchema.parse(req.body);
    next();
  } catch (error: any) {
    res.status(400).json({
      message: 'Datos de login inválidos',
      errors: error.errors
    });
    return;
  }
};