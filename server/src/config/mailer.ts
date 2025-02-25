// server/src/config/mailer.ts
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST, // por ejemplo: 'smtp.gmail.com'
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: process.env.EMAIL_SECURE === 'true', // true para 465, false para otros puertos
  auth: {
    user: process.env.EMAIL_USER, // tu correo electrónico
    pass: process.env.EMAIL_PASS, // tu contraseña o app password
  },
});

export default transporter;
