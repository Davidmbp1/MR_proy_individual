// server/src/config/logger.ts

import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf, colorize, errors } = format;

// Formato de salida de logs
const myFormat = printf(({ level, message, timestamp, stack }) => {
  // stack aparece si usas errors({ stack: true }) y hay un error real
  return stack
    ? `${timestamp} [${level}]: ${message} - ${stack}`
    : `${timestamp} [${level}]: ${message}`;
});

const logger = createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: combine(
    colorize(),                       // colores en consola
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }),         // capturar stacktrace
    myFormat
  ),
  transports: [
    new transports.Console(),
    // Si quieres guardar logs en archivos:
    // new transports.File({ filename: 'logs/error.log', level: 'error' }),
    // new transports.File({ filename: 'logs/combined.log' }),
  ],
});

export default logger;
