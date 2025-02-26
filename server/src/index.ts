// server/index.ts
import { Request, Response } from 'express';
import { createApp } from './app';

// Exporta un handler asíncrono que Vercel invoca por cada request.
// Vercel espera que el default export sea una función (handler).
export default async function handler(req: Request, res: Response): Promise<void> {
  const app = await createApp();
  return app(req, res);
}
