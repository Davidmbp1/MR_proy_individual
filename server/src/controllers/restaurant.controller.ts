import { RequestHandler } from 'express';
import Restaurant from '../models/Restaurant';

/**
 * GET /api/restaurants
 *  - Soporta ?region= para filtrar por región (p.ej. "London").
 *  - Puedes ampliar para filtrar por priceRange, cuisine, etc.
 */
export const getAllRestaurants: RequestHandler = async (req, res) => {
  try {
    const { region } = req.query;
    const query: any = {};

    if (region) {
      query.region = region;
    }

    const restaurants = await Restaurant.find(query);
    res.json(restaurants);
    return;
  } catch (error) {
    console.error('Error getAllRestaurants:', error);
    res.status(500).json({ message: 'Internal server error' });
    return;
  }
};

/**
 * GET /api/restaurants/:id
 *  - Obtener un restaurante por su ID (incluyendo sus ofertas).
 */
export const getRestaurantById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      res.status(404).json({ message: 'Restaurant not found' });
      return;
    }
    res.json(restaurant);
    return;
  } catch (error) {
    console.error('Error getRestaurantById:', error);
    res.status(500).json({ message: 'Internal server error' });
    return;
  }
};

/**
 * POST /api/restaurants
 *  - Crear un nuevo restaurante (puede incluir offers en el body o no).
 */
export const createRestaurant: RequestHandler = async (req, res) => {
  try {
    const newRest = await Restaurant.create(req.body);
    res.status(201).json(newRest);
    return;
  } catch (error) {
    console.error('Error createRestaurant:', error);
    res.status(500).json({ message: 'Internal server error' });
    return;
  }
};

/**
 * POST /api/restaurants/:id/offers
 *  - Añadir una oferta de último minuto a un restaurante existente.
 */
export const addOfferToRestaurant: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, originalPrice, expiryDate, quantity } = req.body;

    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      res.status(404).json({ message: 'Restaurant not found' });
      return;
    }

    restaurant.offers.push({
      title,
      description,
      price,
      originalPrice,
      expiryDate,
      quantity
    });

    await restaurant.save();
    res.status(201).json({ message: 'Offer added', restaurant });
    return;
  } catch (error) {
    console.error('Error addOfferToRestaurant:', error);
    res.status(500).json({ message: 'Internal server error' });
    return;
  }
};
