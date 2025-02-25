import { Request, Response } from 'express';
import User from '../models/user';
import logger from '../config/logger';

// 1) Extendemos Request con la interfaz de "Express.Multer.File"
type MulterRequest = Request & {
  file?: Express.Multer.File; // <-- De aquí sacamos path, filename
};

/**
 * GET /api/users/me
 */
export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.userId;
    if (!userId) {
      res.status(401).json({ message: 'No estás autenticado' });
      return;
    }

    // Buscamos al usuario
    const user = await User.findById(userId).select('-password');
    if (!user) {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }

    res.json({ user });
    return;
  } catch (error) {
    logger.error('Error en getUser:', error);
    res.status(500).json({ message: 'Error interno al obtener datos del usuario' });
    return;
  }
};

/**
 * PUT /api/users/profile
 */
export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.userId;
    if (!userId) {
      res.status(401).json({ message: 'No estás autenticado' });
      return;
    }

    const { promoCode, agreeTerms, contactPermission, name } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }

    if (promoCode !== undefined) user.promoCode = promoCode;
    if (agreeTerms !== undefined) user.agreeTerms = !!agreeTerms;
    if (contactPermission !== undefined) user.contactPermission = contactPermission;
    if (name !== undefined) user.name = name;

    await user.save();
    logger.info(`Perfil actualizado para user ${user._id} (${user.email})`);

    res.json({
      message: 'Perfil actualizado',
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        promoCode: user.promoCode,
        agreeTerms: user.agreeTerms,
        contactPermission: user.contactPermission,
      },
    });
    return;
  } catch (error) {
    logger.error('Error en updateProfile:', error);
    res.status(500).json({ message: 'Error interno al actualizar perfil' });
    return;
  }
};

/**
 * PUT /api/users/avatar
 * Maneja la subida de avatar con multer.
 * req.file es de tipo Express.Multer.File gracias a MulterRequest
 */
export const updateAvatar = async (req: MulterRequest, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.userId;
    if (!userId) {
      res.status(401).json({ message: 'No estás autenticado' });
      return;
    }

    if (!req.file) {
      res.status(400).json({ message: 'No se subió ningún archivo' });
      return;
    }

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }

    const { filename } = req.file;
    // Ejemplo de URL si sirves /uploads estáticamente
    const avatarUrl = `/uploads/${filename}`;

    user.avatarUrl = avatarUrl;
    await user.save();

    logger.info(`Avatar actualizado para user ${user._id}`);
    res.json({ avatarUrl });
    return;
  } catch (error) {
    logger.error('Error en updateAvatar:', error);
    res.status(500).json({ message: 'Error interno al subir avatar' });
    return;
  }
};
