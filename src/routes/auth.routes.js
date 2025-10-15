import { Router } from 'express';
import { prisma } from '../db.js'; // keep this one to access DB
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { success } from 'zod';

const {
  JWT_SECRET,
  JWT_EXPIRES_IN = '1h',
  BCRYPT_SALT_ROUNDS = 10,
} = process.env;


console.log('abhishek - JWT_SECRET:', JWT_SECRET);
console.log('abhishek - JWT_EXPIRES_IN:', JWT_EXPIRES_IN);
console.log('abhishek - BCRYPT_SALT_ROUNDS:', BCRYPT_SALT_ROUNDS);

const r = Router();

r.post('/login', async (req, res) => {

  try {
    const { email, password } = req.body;

    //check if email and password is there
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password are required' });
    }

    let user;
    try {
      user = await prisma.user.findUnique({ where: { email } });
    } catch (dbErr) {
      console.error('Database lookup error:', dbErr);
      return res.status(500).json({
        ok: false,
        message: 'Something went wrong while fetching user. Please try again.',
      });
    }


        if (!user) {
      // Don't reveal which part failed — generic for security
      return res.status(401).json({ ok: false, message: 'Invalid credentials.' });
    }

      // 3️⃣ Compare password (inside try block)
    let isMatch = false;
    try {
      isMatch = await bcrypt.compare(password, user.password);
    } catch (bcryptErr) {
      console.error('Password compare error:', bcryptErr);
      // return res.status(500).json({
      //   ok: false,
      //   message: 'Something went wrong while verifying password. Please try again.',
      // });
    }

    if (!isMatch) {
      return res.status(401).json({ ok: false, message: 'Invalid credentials.' });
    }

        let token;
    try {
      token = jwt.sign(
        { sub: user.id, role: user.role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );
    } catch (jwtErr) {
      console.error('JWT generation error:', jwtErr);
      // fallback — respond without token (non-fatal)
      return res.status(500).json({
        ok: false,
        message: 'Login succeeded, but token generation failed. Please retry.',
      });
    }

    console.log("token:", token);



  } catch (error) {

    return res.status(500).json({ success: false, error: 'Something went wrong' });

  }




})

export default r;