// server/src/controllers/checkout.controller.ts

import { Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import Stripe from 'stripe';
import Restaurant from '../models/Restaurant';
import Purchase from '../models/Purchase';
import crypto from 'crypto'; // Usamos crypto para generar un voucherCode
import { Types } from 'mongoose'; // Por si necesitamos manipular ObjectId

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-01-27.acacia',
});

/**
 * Crea una sesión de Checkout de Stripe para un Offer específico.
 * Genera un Purchase en status "pending" y guarda un voucherCode único.
 */
export const createCheckoutSession = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user?.userId) {
      // Aseguramos que el usuario esté autenticado
      console.error('User not found or not authenticated');
      res.status(401).json({ error: 'User not authenticated' });
      return;
    }

    const { offerId } = req.body;
    if (!offerId) {
      console.error('No offerId provided');
      res.status(400).json({ error: 'offerId is required' });
      return;
    }

    // Buscar la oferta dentro de un Restaurant
    const restaurant = await Restaurant.findOne({ 'offers._id': offerId });
    if (!restaurant) {
      console.error('Restaurant not found for offerId:', offerId);
      res.status(404).json({ error: 'Offer not found' });
      return;
    }

    const offer = restaurant.offers.find(
      (o) => o._id && o._id.toString() === offerId
    );
    if (!offer || !offer.stripePriceId) {
      console.error('Offer not linked to Stripe or not found. stripePriceId:', offer?.stripePriceId);
      res.status(404).json({ error: 'Offer not found or not linked to Stripe' });
      return;
    }

    // Leer FRONTEND_URL desde .env
    const frontendUrl = process.env.FRONTEND_URL;
    if (!frontendUrl) {
      console.error('FRONTEND_URL is not defined in environment');
      res.status(500).json({ error: 'Internal configuration error' });
      return;
    }

    // Obtener la cuenta conectada
    const connectedAccountId = restaurant.stripeAccountId;
    if (!connectedAccountId) {
      console.error('This business is not connected to Stripe');
      res.status(400).json({ error: 'This business is not connected to Stripe' });
      return;
    }

    // Calcular comisión como porcentaje (ej. 10% de la cantidad)
    const totalAmount = offer.price * 100; // Convertir el precio a centavos
    const feePercentage = 0.10;            // 10% de comisión
    const applicationFeeAmount = Math.round(totalAmount * feePercentage);

    // Crear la sesión de checkout con transfer_data (para cuentas conectadas)
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

    console.log('Checkout Session creada con ID:', session.id);

    // Generar un código único para el voucher usando crypto (10 caracteres hex)
    const voucherCode = crypto.randomBytes(5).toString('hex');

    // Crear registro de Purchase en la BD
    const newPurchase = new Purchase({
      userId: req.user.userId, // Almacenamos el userId desde el token
      restaurantId: restaurant._id instanceof Types.ObjectId
        ? restaurant._id.toString()
        : restaurant._id,
      offerId: offerId,
      amount: offer.price, // El precio de la oferta (en dólares o soles, según tu lógica)
      status: 'pending',
      stripeSessionId: session.id,
      voucherCode: voucherCode,
    });

    await newPurchase.save();

    // Devolvemos el sessionId y la URL (opcional)
    res.json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    res
      .status(500)
      .json({ error: error.message || 'Error creating checkout session' });
  }
};
