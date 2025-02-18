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

    // Verificar si ya existe usuario
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'El email ya está en uso' });
      return;
    }

    // Hashear password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const newUser = await User.create({
      email,
      password: hashedPassword,
      name
    });

    // Generar token (mantener logueado)
    const token = jwt.sign(
      { userId: newUser._id, role: newUser.role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    logger.info(`Usuario registrado: ${newUser._id} (${newUser.email})`);

    res.status(201).json({
      message: 'Usuario registrado correctamente',
      user: {
        id: newUser._id,
        email: newUser.email
      },
      token // Retornamos el JWT
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

    // Buscar usuario
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: 'Credenciales inválidas (usuario no encontrado)' });
      return;
    }

    // Validar password
    if (!user.password) {
      res.status(401).json({ message: 'Usuario registrado con Google, use Google Login' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: 'Credenciales inválidas (password incorrecto)' });
      return;
    }

    // Generar JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    logger.info(`Usuario logueado: ${user._id} (${user.email})`);

    res.json({
      message: 'Login exitoso',
      token
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

    // Verificar token con google
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

    // Buscar o crear usuario
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        email,
        googleId: sub,
        name
      });
    } else if (!user.googleId) {
      user.googleId = sub || '';
      // Asignar name si no tiene
      if (!user.name && name) {
        user.name = name;
      }
      await user.save();
    }

    // Generar JWT interno
    const internalToken = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    logger.info(`Usuario Google login: ${user._id} (${user.email})`);

    res.json({
      message: 'Login con Google exitoso',
      token: internalToken
    });
    return;
  } catch (error) {
    logger.error('Error en googleLogin:', error);
    res.status(500).json({ message: 'Error interno en Google Login' });
    return;
  }
};