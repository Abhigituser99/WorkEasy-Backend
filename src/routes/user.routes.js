import { Router } from 'express';
import { prisma } from '../db.js'; // keep this one to access DB

const r = Router();

/* ----------------------------- Basic Validator ----------------------------- */
// Simple in-file request validator (schema-less, minimal imitation)
function validateUser(req, res, next) {
  const { email, name, role } = req.body;
  if (!email || !name) {
    return res.status(400).json({ ok: false, error: 'Name and email are required' });
  }

  const allowedRoles = ['CLIENT', 'SERVICE_PROVIDER', 'ADMIN'];
  if (role && !allowedRoles.includes(role)) {
    return res.status(400).json({ ok: false, error: 'Invalid role' });
  }

  next();
}

/* ---------------------------- GET /api/users ---------------------------- */
r.get('/', async (req, res) => {
  try {
    // optional query params: limit, skip
    const limit = parseInt(req.query.limit) || 20;
    const skip = parseInt(req.query.skip) || 0;

    const users = await prisma.user.findMany({
      take: limit,
      skip,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true
      }
    });

    res.json({ ok: true, count: users.length, users });
  } catch (err) {
    console.error('❌ Error fetching users:', err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

/* ---------------------------- POST /api/users ---------------------------- */
r.post('/', validateUser, async (req, res) => {
  try {
    const { email, name, role = 'CLIENT', country, age, profilePicture } = req.body;

    const newUser = await prisma.user.create({
      data: { email, name, role, country, age, profilePicture }
    });

    res.status(201).json({ ok: true, user: newUser });
  } catch (err) {
    console.error('❌ Error creating user:', err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

export default r;
