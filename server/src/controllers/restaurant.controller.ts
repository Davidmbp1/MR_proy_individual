import { RequestHandler } from 'express';
import Restaurant from '../models/Restaurant';

export const getAllRestaurants: RequestHandler = async (req, res) => {
  try {
    const { region, cuisine, priceRange, features, dietary } = req.query;
    const query: any = {};

    if (region && typeof region === 'string' && region.trim() !== '') {
      query.region = region.trim();
    }
    if (cuisine && typeof cuisine === 'string' && cuisine.trim() !== '') {
      query.cuisine = { $in: cuisine.split(',').map(c => c.trim()) };
    }
    if (priceRange && typeof priceRange === 'string' && priceRange.trim() !== '') {
      query.priceRange = { $in: priceRange.split(',').map(p => p.trim()) };
    }
    if (features && typeof features === 'string' && features.trim() !== '') {
      query.features = { $all: features.split(',').map(f => f.trim()) };
    }
    if (dietary && typeof dietary === 'string' && dietary.trim() !== '') {
      query.dietary = { $all: dietary.split(',').map(d => d.trim()) };
    }

    const restaurants = await Restaurant.find(query).lean();
    res.json(restaurants);
    return;
  } catch (error) {
    console.error('Error getAllRestaurants:', error);
    res.status(500).json({ message: 'Internal server error' });
    return;
  }
};

export const getAllRegions: RequestHandler = async (req, res) => {
  try {
    const regions = await Restaurant.distinct('region');
    res.json(regions);
    return;
  } catch (error) {
    console.error('Error getAllRegions:', error);
    res.status(500).json({ message: 'Error getting regions' });
    return;
  }
};

export const getFilters: RequestHandler = async (req, res) => {
  try {
    const { region, cuisine, priceRange, features, dietary } = req.query;
    const match: any = {};

    if (region && typeof region === 'string' && region.trim() !== '') {
      match.region = region.trim();
    }
    if (cuisine && typeof cuisine === 'string' && cuisine.trim() !== '') {
      match.cuisine = { $in: cuisine.split(',').map(c => c.trim()) };
    }
    if (priceRange && typeof priceRange === 'string' && priceRange.trim() !== '') {
      match.priceRange = { $in: priceRange.split(',').map(p => p.trim()) };
    }
    if (features && typeof features === 'string' && features.trim() !== '') {
      match.features = { $all: features.split(',').map(f => f.trim()) };
    }
    if (dietary && typeof dietary === 'string' && dietary.trim() !== '') {
      match.dietary = { $all: dietary.split(',').map(d => d.trim()) };
    }

    const regionAgg = await Restaurant.aggregate([
      { $match: match },
      { $group: { _id: '$region', count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);
    const cuisineAgg = await Restaurant.aggregate([
      { $match: match },
      { $unwind: '$cuisine' },
      { $group: { _id: '$cuisine', count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);
    const priceRangeAgg = await Restaurant.aggregate([
      { $match: match },
      { $group: { _id: '$priceRange', count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);
    const featuresAgg = await Restaurant.aggregate([
      { $match: match },
      { $unwind: '$features' },
      { $group: { _id: '$features', count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);
    const dietaryAgg = await Restaurant.aggregate([
      { $match: match },
      { $unwind: '$dietary' },
      { $group: { _id: '$dietary', count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);

    const regionFilters = regionAgg.map(r => ({ name: r._id, count: r.count }));
    const cuisineFilters = cuisineAgg.map(c => ({ name: c._id, count: c.count }));
    const priceRangeFilters = priceRangeAgg.map(p => ({ name: p._id, count: p.count }));
    const featuresFilters = featuresAgg.map(f => ({ name: f._id, count: f.count }));
    const dietaryFilters = dietaryAgg.map(d => ({ name: d._id, count: d.count }));

    res.json({
      region: regionFilters,
      cuisine: cuisineFilters,
      priceRange: priceRangeFilters,
      features: featuresFilters,
      dietary: dietaryFilters,
    });
    return;
  } catch (error) {
    console.error('Error getFilters:', error);
    res.status(500).json({ message: 'Error obtaining filter data' });
    return;
  }
};

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

export const addOfferToRestaurant: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, originalPrice, expiryDate, quantity } = req.body;
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      res.status(404).json({ message: 'Restaurant not found' });
      return;
    }
    restaurant.offers.push({ title, description, price, originalPrice, expiryDate, quantity });
    await restaurant.save();
    res.status(201).json({ message: 'Offer added', restaurant });
    return;
  } catch (error) {
    console.error('Error addOfferToRestaurant:', error);
    res.status(500).json({ message: 'Internal server error' });
    return;
  }
};
