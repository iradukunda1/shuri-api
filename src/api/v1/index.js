import { Router } from 'express';
import admin from './routes/admin';
import rootRouter from './routes';

const router = Router();

router.use('/v1/', admin, rootRouter);

export default router;
