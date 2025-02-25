// server/src/routes/restaurant.routes.ts
import { Router } from 'express';
import {
  getAllRestaurants,
  getAllRegions,
  getFilters,
  getRestaurantById,
  createRestaurant,
  addOfferToRestaurant
} from '../controllers/restaurant.controller';

const router = Router();

// GET /api/restaurants
router.get('/', getAllRestaurants);

// GET /api/restaurants/regions
router.get('/regions', getAllRegions);

// GET /api/restaurants/filters
router.get('/filters', getFilters);

// GET /api/restaurants/:id
router.get('/:id', getRestaurantById);

// POST /api/restaurants
router.post('/', createRestaurant);

// POST /api/restaurants/:id/offers
router.post('/:id/offers', addOfferToRestaurant);

export default router;
