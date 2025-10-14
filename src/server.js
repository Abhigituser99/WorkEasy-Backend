import 'dotenv/config';
import express from 'express';
import { prisma } from './db.js';

const app = express();
app.use(express.json());

console.log('🟢 Connected to Database URL:', process.env.DATABASE_URL || 'Not Found');

app.get('/health', async (_req, res) => {
  try {
    const [{ now }] = await prisma.$queryRawUnsafe('SELECT NOW() AS now');
    res.json({ ok: true, now, env: process.env.NODE_ENV || 'dev' });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.get('/users', async (_req, res) => {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    select: { id: true, email: true, name: true, role: true, createdAt: true }
  });
  res.json(users);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`🚀 API running on http://localhost:${port}`));
