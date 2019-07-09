import { Router } from 'express';
import admin from './routes/admin';
import auth from './routes/auth';
import rootRouter from './routes';

const router = Router();

router.use('/v1/', auth, admin, rootRouter);

export default router;
