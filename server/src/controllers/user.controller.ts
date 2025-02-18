import { RequestHandler } from 'express';
import User from '../models/user';
import logger from '../config/logger';

// PUT /api/users/profile
export const updateProfile: RequestHandler = async (req, res) => {
  try {
    // userId desde el token JWT
    const userId = (req as any).user?.userId; 
    if (!userId) {
      res.status(401).json({ message: 'No estás autenticado' });
      return;
    }

    const { promoCode, agreeTerms, contactPermission } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }

    if (promoCode !== undefined) user.promoCode = promoCode;
    if (agreeTerms !== undefined) user.agreeTerms = !!agreeTerms;
    if (contactPermission !== undefined) user.contactPermission = contactPermission;

    await user.save();
    logger.info(`Perfil actualizado para user ${user._id} (${user.email})`);

    res.json({
      message: 'Perfil actualizado',
      user: {
        id: user._id,
        email: user.email,
        promoCode: user.promoCode,
        agreeTerms: user.agreeTerms,
        contactPermission: user.contactPermission
      }
    });
    return;
  } catch (error) {
    logger.error('Error en updateProfile:', error);
    res.status(500).json({ message: 'Error interno al actualizar perfil' });
    return;
  }
};