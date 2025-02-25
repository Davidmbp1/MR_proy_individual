// server/src/controllers/email.controller.ts
import { Request, Response, RequestHandler } from 'express';
import transporter from '../config/mailer';
import logger from '../config/logger';

export const sendTestEmail: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { to, subject, text, html } = req.body;
    if (!to || !subject) {
      res.status(400).json({ message: 'Email recipient and subject are required.' });
      return;
    }

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to,
      subject,
      text,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info('Email sent: ' + info.response);
    res.json({ message: 'Email sent successfully', info });
    return;
  } catch (error) {
    logger.error('Error sending email:', error);
    res.status(500).json({ message: 'Internal error sending email' });
    return;
  }
};
