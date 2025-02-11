import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret-dev';

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: string;
  };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization; 
    // Se espera algo como "Bearer <token>"
    if (!authHeader) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1]; 
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; role: string };

    req.user = decoded; // Guardamos en la request
    next();
  } catch (error) {
    console.error('Error en authMiddleware:', error);
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};
