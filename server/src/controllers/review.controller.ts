import { Request, Response, RequestHandler } from 'express';
import Review, { IReview } from '../models/Review';
import logger from '../config/logger';
import { bucket } from '../config/googleCloudStorage';

type MulterRequest = Request & {
  files?: Express.Multer.File[];
};

const uploadFileToGCS = (file: Express.Multer.File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const { originalname, buffer, mimetype } = file;
    const filename = `${Date.now()}_${originalname}`;
    const fileUpload = bucket.file(filename);
    const stream = fileUpload.createWriteStream({
      metadata: { contentType: mimetype },
    });
    stream.on('error', (err) => {
      logger.error('Error al subir archivo a GCS:', err);
      reject(err);
    });
    stream.on('finish', async () => {
      // No usamos makePublic() debido a uniform bucket-level access.
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${filename}`;
      resolve(publicUrl);
    });
    stream.end(buffer);
  });
};

export const createReview = (async (req: MulterRequest, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.userId;
    if (!userId) {
      res.status(401).json({ message: 'Not authenticated' });
      return;
    }
    
    const { restaurant, rating, comment } = req.body;
    if (!restaurant || !rating || !comment) {
      res.status(400).json({ message: 'restaurant, rating, and comment are required' });
      return;
    }

    const uploadedFiles = (req.files as Express.Multer.File[] | undefined) || [];
    const images: string[] = await Promise.all(uploadedFiles.map(file => uploadFileToGCS(file)));

    const review: IReview = new Review({
      user: userId,
      restaurant,
      rating,
      comment,
      images,
    });

    await review.save();
    await review.populate('user', 'name avatarUrl email');
    logger.info(`Review created for restaurant ${restaurant} by user ${userId}`);

    const io = req.app.get('socketio');
    if (io) {
      io.emit('reviewCreated', review);
    }

    res.status(201).json({ review });
    return;
  } catch (error) {
    logger.error('Error creating review:', error);
    res.status(500).json({ message: 'Internal error while creating review' });
    return;
  }
}) as RequestHandler;

export const getReviewsByRestaurant: RequestHandler = async (req, res) => {
  try {
    const { restaurantId } = req.query;
    if (!restaurantId) {
      res.status(400).json({ message: 'restaurantId query parameter is required' });
      return;
    }
    const reviews = await Review.find({ restaurant: restaurantId })
      .populate('user', 'name avatarUrl email')
      .sort({ createdAt: -1 });
    res.json({ reviews });
    return;
  } catch (error) {
    logger.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Internal error while fetching reviews' });
    return;
  }
};

export const updateReview: RequestHandler = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const userId = (req as any).user?.userId;
    if (!userId) {
      res.status(401).json({ message: 'Not authenticated' });
      return;
    }
    const review = await Review.findById(reviewId);
    if (!review) {
      res.status(404).json({ message: 'Review not found' });
      return;
    }
    if (review.user.toString() !== userId) {
      res.status(403).json({ message: 'You are not authorized to update this review' });
      return;
    }
    const { rating, comment, images } = req.body;
    if (rating !== undefined) review.rating = rating;
    if (comment !== undefined) review.comment = comment;
    if (images !== undefined) review.images = images;
    await review.save();
    logger.info(`Review ${reviewId} updated by user ${userId}`);

    const io = req.app.get('socketio');
    if (io) {
      io.emit('reviewUpdated', review);
    }

    res.json({ review });
    return;
  } catch (error) {
    logger.error('Error updating review:', error);
    res.status(500).json({ message: 'Internal error while updating review' });
    return;
  }
};

export const deleteReview: RequestHandler = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const userId = (req as any).user?.userId;
    if (!userId) {
      res.status(401).json({ message: 'Not authenticated' });
      return;
    }
    const review = await Review.findById(reviewId);
    if (!review) {
      res.status(404).json({ message: 'Review not found' });
      return;
    }
    if (review.user.toString() !== userId) {
      res.status(403).json({ message: 'You are not authorized to delete this review' });
      return;
    }
    await Review.findByIdAndDelete(reviewId);
    logger.info(`Review ${reviewId} deleted by user ${userId}`);

    const io = req.app.get('socketio');
    if (io) {
      io.emit('reviewDeleted', reviewId);
    }

    res.json({ message: 'Review deleted successfully' });
    return;
  } catch (error) {
    logger.error('Error deleting review:', error);
    res.status(500).json({ message: 'Internal error while deleting review' });
    return;
  }
};
