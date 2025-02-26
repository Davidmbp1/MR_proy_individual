import { Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import Stripe from 'stripe';
import Restaurant from '../models/Restaurant';
import Purchase from '../models/Purchase';
import crypto from 'crypto';
import { Types } from 'mongoose';
import logger from '../config/logger';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-01-27.acacia',
});

export const createCheckoutSession = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user?.userId) {
      logger.error('User not found or not authenticated');
      res.status(401).json({ error: 'User not authenticated' });
      return;
    }

    const { offerId } = req.body;
    if (!offerId) {
      logger.error('No offerId provided');
      res.status(400).json({ error: 'offerId is required' });
      return;
    }

    // Buscar el restaurante que contiene la oferta
    const restaurant = await Restaurant.findOne({ 'offers._id': offerId });
    if (!restaurant) {
      logger.error('Restaurant not found for offerId:', offerId);
      res.status(404).json({ error: 'Offer not found' });
      return;
    }

    // Buscar la oferta dentro del restaurante
    const offer = restaurant.offers.find(
      (o) => o._id && o._id.toString() === offerId
    );
    if (!offer || !offer.stripePriceId) {
      logger.error('Offer not linked to Stripe or not found. stripePriceId:', offer?.stripePriceId);
      res.status(404).json({ error: 'Offer not found or not linked to Stripe' });
      return;
    }

    const frontendUrl = process.env.FRONTEND_URL;
    if (!frontendUrl) {
      logger.error('FRONTEND_URL is not defined in environment');
      res.status(500).json({ error: 'Internal configuration error' });
      return;
    }

    const connectedAccountId = restaurant.stripeAccountId;
    if (!connectedAccountId) {
      logger.error('This business is not connected to Stripe');
      res.status(400).json({ error: 'This business is not connected to Stripe' });
      return;
    }

    const totalAmount = offer.price * 100;
    const feePercentage = 0.10;
    const applicationFeeAmount = Math.round(totalAmount * feePercentage);

    // Crear la sesión de checkout en Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: offer.stripePriceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${frontendUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${frontendUrl}/checkout/cancel`,
      payment_intent_data: {
        application_fee_amount: applicationFeeAmount,
        transfer_data: {
          destination: connectedAccountId,
        },
      },
    });

    logger.info('Checkout Session creada con ID:', session.id);

    const voucherCode = crypto.randomBytes(5).toString('hex');

    // Crear el registro de Purchase en la base de datos
    const newPurchase = new Purchase({
      userId: req.user.userId,
      restaurantId: restaurant._id instanceof Types.ObjectId
        ? restaurant._id.toString()
        : restaurant._id,
      offerId: offerId,
      amount: offer.price,
      status: 'pending',
      stripeSessionId: session.id,
      voucherCode: voucherCode,
    });

    await newPurchase.save();
    logger.info('Purchase creada con ID:', newPurchase._id);

    res.json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    logger.error('Error creating checkout session:', error);
    res.status(500).json({ error: error.message || 'Error creating checkout session' });
  }
};
