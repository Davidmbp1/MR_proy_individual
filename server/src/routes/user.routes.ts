import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { updateProfile } from '../controllers/user.controller';

const router = Router();

// PUT /api/users/profile
router.put('/profile', authMiddleware, updateProfile);

export default router;