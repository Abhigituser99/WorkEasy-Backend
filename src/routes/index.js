import { Router } from 'express';
import users from './user.routes.js';

const router = Router();
router.use('/users', users);

export default router;
