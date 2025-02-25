// server/src/models/Restaurant.ts
import { Schema, model, Document, Types } from 'mongoose';

/** Interfaz para la ubicación (GeoJSON) */
export interface ILocation {
  type: 'Point';
  coordinates: [number, number]; // [lng, lat]
}

/** Interfaz para una Oferta */
export interface IOffer {
  _id?: Types.ObjectId; // <-- OPCIONAL
  title: string;
  description?: string;
  price: number;
  originalPrice?: number;
  expiryDate: Date;
  quantity?: number;
  status?: string;
  stripePriceId?: string;
}

/** Interfaz del documento Restaurant */
export interface IRestaurant extends Document {
  _id: Types.ObjectId;
  name: string;
  region: string;
  cuisine?: string[];
  rating?: number;
  mainImage?: string;
  address?: string;
  priceRange?: string;
  features?: string[];
  dietary?: string[];
  entryRequirements?: string[];
  goodFor?: string[];
  venueType?: string;
  offers: IOffer[];
  location: ILocation;
  stripeAccountId?: string;
}

/** Esquema para la ubicación */
const locationSchema = new Schema<ILocation>(
  {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      default: [0, 0],
    },
  },
  { _id: false }
);

/** Esquema para las ofertas  
 * (No usamos { _id: false } para que Mongoose genere automáticamente un _id para cada oferta)
 */
const offerSchema = new Schema<IOffer>({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  expiryDate: { type: Date, required: true },
  quantity: { type: Number, default: 1 },
  status: { type: String, default: 'active' },
  stripePriceId: { type: String },
});

/** Esquema principal de Restaurant */
const restaurantSchema = new Schema<IRestaurant>(
  {
    name: { type: String, required: true },
    region: { type: String, required: true },
    cuisine: [{ type: String }],
    rating: { type: Number, default: 0 },
    mainImage: { type: String, default: '' },
    address: { type: String, default: '' },
    priceRange: { type: String, default: '$$' },
    features: [{ type: String }],
    dietary: [{ type: String }],
    entryRequirements: [{ type: String }],
    goodFor: [{ type: String }],
    venueType: { type: String, default: '' },
    offers: [offerSchema],
    location: locationSchema,
    stripeAccountId: { type: String },
  },
  {
    timestamps: true,
  }
);

// Índice geoespacial
restaurantSchema.index({ location: '2dsphere' });

export default model<IRestaurant>('Restaurant', restaurantSchema);
