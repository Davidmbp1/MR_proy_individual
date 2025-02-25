// server/src/controllers/webhook.controller.ts

import { Request, Response } from 'express';
import Stripe from 'stripe';
import Purchase from '../models/Purchase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-01-27.acacia',
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

export const stripeWebhook = async (req: Request, res: Response): Promise<void> => {
  const sig = req.headers['stripe-signature'];
  if (!sig) {
    res.status(400).send('Missing Stripe signature');
    return;
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err: any) {
    console.error('Error verifying webhook signature:', err);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log('Checkout Session completada:', session.id);

      try {
        const purchase = await Purchase.findOne({ stripeSessionId: session.id });
        if (purchase) {
          purchase.status = 'paid';
          if (session.payment_intent) {
            purchase.stripePaymentIntentId = session.payment_intent.toString();
          }
          await purchase.save();
          console.log(`Purchase ${purchase._id} marcado como 'paid'.`);
        } else {
          console.warn('No se encontró Purchase para session:', session.id);
        }
      } catch (error) {
        console.error('Error updating purchase:', error);
      }
      break;
    }

    default:
      console.log(`Unhandled event type ${event.type}`);
      break;
  }

  res.json({ received: true });
};
