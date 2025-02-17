// server/src/models/User.ts
import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password?: string; // opcional si usa Google
  name?: string;
  googleId?: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String },
    name: { type: String },
    googleId: { type: String }, 
    role: { type: String, default: 'client' }
  },
  { timestamps: true }
);

export default model<IUser>('User', userSchema);
