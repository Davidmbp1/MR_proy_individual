import { Request, Response } from 'express';
import User from '../models/user';
import logger from '../config/logger';
import { bucket } from '../config/googleCloudStorage';

type MulterRequest = Request & {
  file?: Express.Multer.File;
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.userId;
    if (!userId) {
      res.status(401).json({ message: 'No estás autenticado' });
      return;
    }
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
    const { originalname, buffer, mimetype } = req.file;
    const filename = `${Date.now()}_${originalname}`;
    const file = bucket.file(filename);
    const stream = file.createWriteStream({
      metadata: { contentType: mimetype },
    });
    stream.on('error', (err) => {
      logger.error('Error al subir archivo a GCS:', err);
      res.status(500).json({ message: 'Error uploading avatar. Please try again.' });
    });
    stream.on('finish', async () => {
      // Con Uniform Bucket-Level Access, no se puede usar makePublic.
      // Por ello, debes haber configurado el bucket en IAM para permitir que allUsers tengan el rol "Storage Object Viewer"
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;
      user.avatarUrl = publicUrl;
      await user.save();
      logger.info(`Avatar actualizado para user ${user._id}`);
      res.json({ avatarUrl: publicUrl });
    });
    stream.end(buffer);
  } catch (error) {
    logger.error('Error en updateAvatar:', error);
    res.status(500).json({ message: 'Error interno al subir avatar' });
    return;
  }
};
