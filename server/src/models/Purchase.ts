// server/src/models/Purchase.ts
import { Schema, model, Document } from 'mongoose';

export interface IPurchase extends Document {
  userId?: string;            
  restaurantId: string;       
  offerId: string;            
  amount: number;             
  status: string;             
  stripeSessionId?: string;   
  stripePaymentIntentId?: string; 
  voucherCode?: string;
  redeemedAt?: Date;          
  createdAt: Date;
  updatedAt: Date;
}

const purchaseSchema = new Schema<IPurchase>(
  {
    userId:          { type: String },
    restaurantId:    { type: String, required: true },
    offerId:         { type: String, required: true },
    amount:          { type: Number, required: true },
    status:          { type: String, default: 'pending' },
    stripeSessionId: { type: String },
    stripePaymentIntentId: { type: String },
    voucherCode:     { type: String },
    redeemedAt:      { type: Date },
  },
  {
    timestamps: true
  }
);

export default model<IPurchase>('Purchase', purchaseSchema);
