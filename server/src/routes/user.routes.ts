// server/src/routes/user.routes.ts
import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { updateProfile, getUser, updateAvatar } from '../controllers/user.controller';
import multer from 'multer';

const router = Router();

// Usamos memoryStorage para que el archivo se mantenga en buffer
const upload = multer({ storage: multer.memoryStorage() });

router.get('/me', authMiddleware, getUser);
router.put('/profile', authMiddleware, updateProfile);
router.put('/avatar', authMiddleware, upload.single('avatar'), updateAvatar);

export default router;
