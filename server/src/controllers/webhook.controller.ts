import { Request, Response } from 'express';
import Stripe from 'stripe';
import Purchase from '../models/Purchase';
import logger from '../config/logger';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-01-27.acacia',
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

export const stripeWebhook = async (req: Request, res: Response): Promise<void> => {
  const sig = req.headers['stripe-signature'];
  logger.info('Webhook request received. Stripe-Signature:', sig);

  if (!sig) {
    logger.error('Missing Stripe signature');
    res.status(400).send('Missing Stripe signature');
    return;
  }

  let event: Stripe.Event;
  try {
    // Agrega log del body raw (podrías imprimir solo parte para evitar exponer datos sensibles)
    logger.info('Raw body received for webhook.');
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    logger.info(`Webhook event constructed: ${event.type}`);
  } catch (err: any) {
    logger.error('Error verifying webhook signature:', err);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      logger.info('Checkout Session completada:', session.id);
      
      try {
        // Log para verificar la búsqueda
        logger.info(`Buscando Purchase con stripeSessionId: ${session.id}`);
        const purchase = await Purchase.findOne({ stripeSessionId: session.id });
        if (purchase) {
          purchase.status = 'paid';
          if (session.payment_intent) {
            purchase.stripePaymentIntentId = session.payment_intent.toString();
          }
          await purchase.save();
          logger.info(`Purchase ${purchase._id} marcado como 'paid'.`);
        } else {
          logger.warn('No se encontró Purchase para session:', session.id);
        }
      } catch (error) {
        logger.error('Error updating purchase:', error);
      }
      break;
    }
    default:
      logger.info(`Unhandled event type ${event.type}`);
      break;
  }

  res.json({ received: true });
};
