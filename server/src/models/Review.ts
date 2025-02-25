// server/src/models/Review.ts

import { Schema, model, Document, Types } from 'mongoose';

export interface IReview extends Document {
  user: Types.ObjectId;          // Referencia al usuario que escribe la reseña
  restaurant: Types.ObjectId;    // Referencia al restaurante (o local) reseñado
  rating: number;                // Calificación (de 1 a 5)
  comment: string;               // Texto del comentario
  images?: string[];             // Array opcional de URLs de imágenes
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<IReview>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    images: [{ type: String }],
  },
  { timestamps: true }
);

// Índice para búsquedas por restaurante y orden por fecha
reviewSchema.index({ restaurant: 1, createdAt: -1 });

export default model<IReview>('Review', reviewSchema);
