// server/src/controllers/purchase.controller.ts

import { Request, Response } from 'express';
import Purchase from '../models/Purchase';
import { AuthRequest } from '../middlewares/authMiddleware';

/**
 * Obtiene las compras del usuario autenticado, ordenadas de más recientes a más antiguas.
 */
export const getMyPurchases = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    const purchases = await Purchase.find({ userId: req.user.userId })
      .sort({ createdAt: -1 });
    res.json({ purchases });
  } catch (error: any) {
    console.error('Error getting purchases:', error);
    res
      .status(500)
      .json({ error: error.message || 'Error retrieving purchases' });
  }
};

/**
 * Obtiene una compra por sessionId (Stripe) perteneciente al usuario autenticado.
 */
export const getPurchaseBySession = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const { sessionId } = req.params;
    const purchase = await Purchase.findOne({
      stripeSessionId: sessionId,
      userId: req.user.userId,
    });

    if (!purchase) {
      res.status(404).json({ message: 'Purchase not found' });
      return;
    }

    res.json({ purchase });
  } catch (error: any) {
    console.error('Error getting purchase by session:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getPurchasesGroupedByUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const groupedPurchases = await Purchase.aggregate([
      {
        $group: {
          _id: '$userId',
          totalPurchases: { $sum: 1 },
          totalAmount: { $sum: '$amount' },
          purchases: { $push: '$$ROOT' },
        },
      },
      { $sort: { totalAmount: -1 } },
    ]);
    res.json({ groupedPurchases });
  } catch (error: any) {
    console.error('Error grouping purchases:', error);
    res
      .status(500)
      .json({ error: error.message || 'Error grouping purchases' });
  }
};
