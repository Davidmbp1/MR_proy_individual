// server/src/controllers/auth.controller.ts

import { RequestHandler } from 'express';
import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret-dev';

//POST /api/auth/register

export const register: RequestHandler = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Validaciones
    if (!email || !password) {
      res.status(400).json({ message: 'Email y password son requeridos' });
      return;
    }

    // ver si el usuaio existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'El email ya está en uso' });
      return;
    }

    // hash pwd
    const hashed = await bcrypt.hash(password, 10);

    // crear nuevo usuario
    const newUser = await User.create({
      email,
      password: hashed,
      name
    });

    // respuesta exitosa
    res.status(201).json({
      message: 'Usuario registrado correctamente',
      user: {
        id: newUser._id,
        email: newUser.email
      }
    });
    return;
  } catch (error) {
    console.error('Error en register:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
    return;
  }
};

//POST /api/auth/login

export const login: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validaciones
    if (!email || !password) {
      res.status(400).json({ message: 'Email y password son requeridos' });
      return;
    }

    // Buscar usuario
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: 'Credenciales inválidas' });
      return;
    }

    // Comparar password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: 'Credenciales inválidas' });
      return;
    }

    // Generar token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      message: 'Login exitoso',
      token
    });
    return;
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
    return;
  }
};
