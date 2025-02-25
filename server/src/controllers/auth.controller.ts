import { RequestHandler } from 'express';
import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import logger from '../config/logger';

const JWT_SECRET = process.env.JWT_SECRET || 'secret-dev';
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);

// POST /api/auth/register
export const register: RequestHandler = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'El email ya está en uso' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      name,
      agreeTerms: false
    });

    const token = jwt.sign(
      { userId: newUser._id, role: newUser.role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    logger.info(`Usuario registrado: ${newUser._id} (${newUser.email})`);

    res.status(201).json({
      message: 'Usuario registrado correctamente',
      user: { id: newUser._id, email: newUser.email },
      token,
      profileCompleted: false
    });
    return;
  } catch (error) {
    logger.error('Error en register:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
    return;
  }
};

// POST /api/auth/login
export const login: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: 'Credenciales inválidas (usuario no encontrado)' });
      return;
    }

    if (!user.password) {
      res.status(401).json({ message: 'Usuario registrado con Google, use Google Login' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: 'Credenciales inválidas (password incorrecto)' });
      return;
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    logger.info(`Usuario logueado: ${user._id} (${user.email})`);

    res.json({
      message: 'Login exitoso',
      token,
      profileCompleted: user.agreeTerms === true
    });
    return;
  } catch (error) {
    logger.error('Error en login:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
    return;
  }
};

// POST /api/auth/google
export const googleLogin: RequestHandler = async (req, res) => {
  try {
    const { token } = req.body;

    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    if (!payload) {
      res.status(401).json({ message: 'Token de Google inválido (sin payload)' });
      return;
    }

    const { email, sub, name } = payload;
    if (!email) {
      res.status(400).json({ message: 'No se pudo obtener email de Google' });
      return;
    }

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        email,
        googleId: sub,
        name,
        agreeTerms: false
      });
    } else if (!user.googleId) {
      user.googleId = sub || '';
      if (!user.name && name) {
        user.name = name;
      }
      await user.save();
    }

    const internalToken = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    logger.info(`Usuario Google login: ${user._id} (${user.email})`);

    res.json({
      message: 'Login con Google exitoso',
      token: internalToken,
      profileCompleted: user.agreeTerms === true
    });
    return;
  } catch (error) {
    logger.error('Error en googleLogin:', error);
    res.status(500).json({ message: 'Error interno en Google Login' });
    return;
  }
};