// server/src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret-dev';

// Extender la interfaz Request
export interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: string;
  };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ message: 'No token provided' });
      return;
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; role: string };

    req.user = decoded;
    next();
  } catch (error) {
    console.error('Error en authMiddleware:', error);
    res.status(401).json({ message: 'Token inválido o expirado' });
    return;
  }
};