import { Schema, model, Document } from 'mongoose';

/** Subdocumento Offer: ofertas de último minuto */
export interface IOffer {
  title: string;
  description?: string;
  price: number;
  originalPrice?: number;
  expiryDate: Date;
  quantity?: number;
  status?: string;  // "active", "expired", etc.
}

/** Documento Restaurant */
export interface IRestaurant extends Document {
  name: string;
  region: string;             // "London", "Lima", etc.
  cuisine?: string[];         // ej. ["British", "Fusion"]
  rating?: number;            // 0-5
  mainImage?: string;         // URL de foto principal
  address?: string;           // dirección textual
  priceRange?: string;        // "$", "$$", "$$$", etc.
  features?: string[];        // ej. ["Outdoor Seating", "Live Music"]
  dietary?: string[];         // ej. ["Vegan", "Gluten-Free"]
  entryRequirements?: string[];// ej. ["Over 18", "Smart Casual"]
  goodFor?: string[];         // ej. ["Groups", "Couples"]
  venueType?: string;         // ej. "Bar", "Restaurant", "Pub"
  offers: IOffer[];           // subdocumentos de ofertas
}

/** Subschema para las ofertas */
const offerSchema = new Schema<IOffer>({
  title:         { type: String, required: true },
  description:   { type: String, default: '' },
  price:         { type: Number, required: true },
  originalPrice: { type: Number },
  expiryDate:    { type: Date, required: true },
  quantity:      { type: Number, default: 1 },
  status:        { type: String, default: 'active' }
}, { _id: false });

/** Esquema principal Restaurant */
const restaurantSchema = new Schema<IRestaurant>({
  name:              { type: String, required: true },
  region:            { type: String, required: true },
  cuisine:           [{ type: String }],
  rating:            { type: Number, default: 0 },
  mainImage:         { type: String, default: '' },
  address:           { type: String, default: '' },
  priceRange:        { type: String, default: '$$' },
  features:          [{ type: String }],
  dietary:           [{ type: String }],
  entryRequirements: [{ type: String }],
  goodFor:           [{ type: String }],
  venueType:         { type: String, default: '' },
  offers:            [offerSchema]
}, {
  timestamps: true
});

export default model<IRestaurant>('Restaurant', restaurantSchema);
