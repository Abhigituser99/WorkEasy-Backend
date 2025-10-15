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
   // 1) Parse pagination
    const page  = Math.max(parseInt(req.query.page)  || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 20, 1), 100);
    const skip  = (page - 1) * limit;

     const { name, email, country, role } = req.query;

     const where={}

    if (name)    where.name    = { contains: String(name), mode: 'insensitive' };
    if (email)   where.email   = { contains: String(email), mode: 'insensitive' };
    if (country) where.country = { contains: String(country), mode: 'insensitive' };
    if (role)    where.role    = String(role).toUpperCase(); // trust only enum values server-side if you validate

   

        const [items, total] = await Promise.all([
      prisma.user.findMany({
        where,
        take: limit,
        skip,
        orderBy: { createdAt: 'desc' },
        //commented for now, as we are going to send all the fields
        //select
      }),
      prisma.user.count({ where })
    ]);

    console.log("abhishek - items:", items);



     res.send('running')

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
