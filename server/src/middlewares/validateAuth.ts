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

// Middleware de validación para registro
export const validateRegister: RequestHandler = (req, res, next) => {
  try {
    registerSchema.parse(req.body);
    // Si pasa la validación, continuamos
    next();
  } catch (error: any) {
    // Si la validación falla, enviamos un error y retornamos
    res.status(400).json({
      message: 'Datos de registro inválidos',
      errors: error.errors
    });
    return; // <--- Retorna void
  }
};

// Middleware de validación para login
export const validateLogin: RequestHandler = (req, res, next) => {
  try {
    loginSchema.parse(req.body);
    // Si pasa la validación, continuamos
    next();
  } catch (error: any) {
    // Si la validación falla, enviamos un error y retornamos
    res.status(400).json({
      message: 'Datos de login inválidos',
      errors: error.errors
    });
    return; // <--- Retorna void
  }
};
