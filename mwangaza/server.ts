import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import authRouter from './src/routes/auth';
import progressRouter from './src/routes/progress';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.use('/api/auth', authRouter);
  app.use('/api/progress', progressRouter);

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
