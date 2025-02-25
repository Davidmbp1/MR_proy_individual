// server/src/models/User.ts

import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password?: string;
  name?: string;
  googleId?: string;
  role: string;

  promoCode?: string;
  agreeTerms?: boolean;
  contactPermission?: 'yes' | 'no';

  createdAt: Date;
  updatedAt: Date;

  // Campo para la foto de perfil
  avatarUrl?: string;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String },
    name: { type: String },
    googleId: { type: String },
    role: { type: String, default: 'client' },
    promoCode: { type: String },
    agreeTerms: { type: Boolean, default: false },
    contactPermission: { type: String, default: 'yes' },

    avatarUrl: { type: String },
  },
  { timestamps: true }
);

export default model<IUser>('User', userSchema);
