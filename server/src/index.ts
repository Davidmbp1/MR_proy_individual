import { Request, Response } from 'express';
import { createApp } from './app';

// Este handler es el que Vercel invoca por cada request.
export default async function handler(req: Request, res: Response): Promise<void> {
  const app = await createApp();
  return app(req, res);
}
