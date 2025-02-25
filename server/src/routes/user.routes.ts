// server/src/routes/user.routes.ts

import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { updateProfile, getUser, updateAvatar } from '../controllers/user.controller';
import multer from 'multer';

const router = Router();

const upload = multer({ dest: 'uploads/' });

router.get('/me', authMiddleware, getUser);
router.put('/profile', authMiddleware, updateProfile);

// PUT /api/users/avatar
router.put(
  '/avatar',
  authMiddleware,
  upload.single('avatar'), 
  updateAvatar
);

export default router;
