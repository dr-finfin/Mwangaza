import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../lib/db.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: 'Please provide email and password' });
  }
  if (password.length < 6) {
    return res.status(400).json({ msg: 'Password must be at least 6 characters long' });
  }

  try {
    const existingUser = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    if (existingUser) {
      return res.status(400).json({ msg: 'An account with this email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const info = db.prepare('INSERT INTO users (email, password) VALUES (?, ?)').run(email, hashedPassword);
    const userId = info.lastInsertRowid;

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) throw new Error('JWT_SECRET is not set');

    const token = jwt.sign({ user: { id: userId } }, jwtSecret, { expiresIn: '24h' });
    res.json({ token });
  } catch (err) {
    console.error('Registration error:', (err as Error).message);
    res.status(500).json({ msg: 'Server error during registration.' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: 'Please provide email and password' });
  }

  try {
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as any;
    if (!user) {
      return res.status(400).json({ msg: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid email or password' });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) throw new Error('JWT_SECRET is not set');

    const token = jwt.sign({ user: { id: user.id } }, jwtSecret, { expiresIn: '24h' });
    res.json({ token });
  } catch (err) {
    console.error('Login error:', (err as Error).message);
    res.status(500).json({ msg: 'Server error during login.' });
  }
});

export default router;
