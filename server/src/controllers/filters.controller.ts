// server/src/controllers/filters.controller.ts
import { RequestHandler } from 'express';
import Restaurant from '../models/Restaurant';
import { PipelineStage } from 'mongoose';

/**
 * GET /api/restaurants/filters
 *   Soporta ?region= para filtrar por región
 *   Retorna contadores de priceRange, cuisine, features, goodFor, dietary
 */
export const getFilters: RequestHandler = async (req, res) => {
  try {
    const { region } = req.query;

    // Creamos el match stage si hay region, o vacío
    const matchStage: PipelineStage.Match = region
      ? { $match: { region } }
      : { $match: {} };

    // priceRange (es un string, no array)
    const priceRangeAgg: PipelineStage[] = [
      matchStage,
      {
        $group: {
          _id: '$priceRange',
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          label: '$_id',
          count: 1,
          _id: 0,
        },
      },
    ];

    // cuisine (es array), necesitamos $unwind
    const cuisineAgg: PipelineStage[] = [
      matchStage,
      { $unwind: '$cuisine' },
      {
        $group: {
          _id: '$cuisine',
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          label: '$_id',
          count: 1,
          _id: 0,
        },
      },
    ];

    // features (array)
    const featuresAgg: PipelineStage[] = [
      matchStage,
      { $unwind: '$features' },
      {
        $group: {
          _id: '$features',
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          label: '$_id',
          count: 1,
          _id: 0,
        },
      },
    ];

    // goodFor (array)
    const goodForAgg: PipelineStage[] = [
      matchStage,
      { $unwind: '$goodFor' },
      {
        $group: {
          _id: '$goodFor',
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          label: '$_id',
          count: 1,
          _id: 0,
        },
      },
    ];

    // dietary (array)
    const dietaryAgg: PipelineStage[] = [
      matchStage,
      { $unwind: '$dietary' },
      {
        $group: {
          _id: '$dietary',
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          label: '$_id',
          count: 1,
          _id: 0,
        },
      },
    ];

    // Ejecutamos en paralelo
    const [priceRanges, cuisines, features, goodFors, dietaries] =
      await Promise.all([
        Restaurant.aggregate(priceRangeAgg),
        Restaurant.aggregate(cuisineAgg),
        Restaurant.aggregate(featuresAgg),
        Restaurant.aggregate(goodForAgg),
        Restaurant.aggregate(dietaryAgg),
      ]);

    res.json({
      priceRanges,
      cuisines,
      features,
      goodFor: goodFors,
      dietary: dietaries,
    });
  } catch (error) {
    console.error('Error getFilters:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
