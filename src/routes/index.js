import { Router } from 'express';
import users from './user.routes.js';
import auth from './auth.routes.js';
import dropdown from './dropdowns/getdropdown.routes.js';

const router = Router();


router.use('/users', users);
router.use('/auth', auth);
router.use('/dropdown',dropdown );

export default router;
