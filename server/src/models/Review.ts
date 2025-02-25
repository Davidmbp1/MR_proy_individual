// server/src/models/Review.ts

import { Schema, model, Document, Types } from 'mongoose';

export interface IReview extends Document {
  user: Types.ObjectId;          
  restaurant: Types.ObjectId;    
  rating: number;                
  comment: string;               
  images?: string[];             
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

reviewSchema.index({ restaurant: 1, createdAt: -1 });

export default model<IReview>('Review', reviewSchema);
