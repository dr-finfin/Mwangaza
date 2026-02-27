import express from 'express';
import db from '../lib/db.js';
import { verifyToken, AuthRequest } from '../middleware/auth.js';

const router = express.Router();

router.get('/', verifyToken, (req: AuthRequest, res) => {
  try {
    const userId = req.user?.id;
    const progress = db.prepare('SELECT * FROM progress WHERE user_id = ?').all(userId);
    res.json(progress);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
});

router.post('/', verifyToken, (req: AuthRequest, res) => {
  const { lesson_id, lesson_name, completed, score } = req.body;
  const userId = req.user?.id;

  try {
    const existing = db.prepare('SELECT id FROM progress WHERE user_id = ? AND lesson_id = ?').get(userId, lesson_id) as any;

    if (existing) {
      db.prepare('UPDATE progress SET completed = ?, score = ?, lesson_name = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
        .run(completed ? 1 : 0, score !== undefined ? score : null, lesson_name || null, existing.id);
    } else {
      db.prepare('INSERT INTO progress (user_id, lesson_id, lesson_name, completed, score) VALUES (?, ?, ?, ?, ?)')
        .run(userId, lesson_id, lesson_name || null, completed ? 1 : 0, score !== undefined ? score : null);
    }

    res.json({ msg: 'Progress updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
});

export default router;
