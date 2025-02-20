import { Router } from 'express';
import {
  getAllRestaurants,
  getRestaurantById,
  createRestaurant,
  addOfferToRestaurant
} from '../controllers/restaurant.controller';

const router = Router();

// GET /api/restaurants
router.get('/', getAllRestaurants);

// GET /api/restaurants/:id
router.get('/:id', getRestaurantById);

// POST /api/restaurants
router.post('/', createRestaurant);

// POST /api/restaurants/:id/offers
router.post('/:id/offers', addOfferToRestaurant);

export default router;
