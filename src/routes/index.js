import { Router } from 'express';
import users from './user.routes.js';
import auth from './auth.routes.js';
import dropdown from './dropdowns/getdropdown.routes.js';
import upload from '../routes/upload.route.js';

const router = Router();


router.use('/users', users);
router.use('/auth', auth);
router.use('/dropdown',dropdown );
router.use('/upload',upload );

export default router;
