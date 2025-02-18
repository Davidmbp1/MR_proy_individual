// server/src/models/User.ts

import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password?: string; // Para email/password
  name?: string;
  googleId?: string;
  role: string;

  // Campos Extras
  promoCode?: string;
  agreeTerms?: boolean;
  contactPermission?: 'yes' | 'no';

  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String },
    name: { type: String },
    googleId: { type: String },
    role: { type: String, default: 'client' },

    // Extras
    promoCode: { type: String },
    agreeTerms: { type: Boolean, default: false },
    contactPermission: { type: String, default: 'yes' },
  },
  { timestamps: true }
);

export default model<IUser>('User', userSchema);