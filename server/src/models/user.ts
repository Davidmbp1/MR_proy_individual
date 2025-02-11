// server/src/models/User.ts

import { Schema, model, Document } from 'mongoose';

// Interfaz del documento de usuario en TS
export interface IUser extends Document {
  email: string;
  password: string;
  name?: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

// Definimos el esquema
const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    name: {
      type: String
    },
    role: {
      type: String,
      default: 'client'  // Roles posibles: "client", "business", "admin"
    }
  },
  { timestamps: true } // Crea createdAt y updatedAt automáticamente
);

// Exportamos el modelo "User" basado en userSchema
export default model<IUser>('User', userSchema);
