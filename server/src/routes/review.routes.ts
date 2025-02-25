// server/src/routes/review.routes.ts
import { Router } from 'express';
import multer from 'multer';
import { authMiddleware } from '../middlewares/authMiddleware';
import { createReview, getReviewsByRestaurant, updateReview, deleteReview } from '../controllers/review.controller';

const router = Router();

// Usamos memoryStorage para los archivos de las reseñas
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', authMiddleware, upload.array('images', 5), createReview);
router.get('/', getReviewsByRestaurant);
router.put('/:id', authMiddleware, updateReview);
router.delete('/:id', authMiddleware, deleteReview);

export default router;