// server/src/routes/review.routes.ts

import { Router } from 'express';
import multer from 'multer';
import { authMiddleware } from '../middlewares/authMiddleware';
import { createReview, getReviewsByRestaurant, updateReview, deleteReview } from '../controllers/review.controller';

const router = Router();

// Configurar multer para cargar imágenes en la carpeta 'uploads'
// Puedes ajustar los límites y filtros si es necesario
const upload = multer({ dest: 'uploads/' });

// Crear una nueva reseña (acepta hasta 5 imágenes en el campo 'images')
router.post('/', authMiddleware, upload.array('images', 5), createReview);

// Obtener reseñas de un restaurante (usando el query parameter restaurantId)
router.get('/', getReviewsByRestaurant);

// Actualizar una reseña
router.put('/:id', authMiddleware, updateReview);

// Eliminar una reseña
router.delete('/:id', authMiddleware, deleteReview);

export default router;
