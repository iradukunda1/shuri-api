import { Router } from 'express';
import admin from './routes/admin';
import auth from './routes/auth';
import company from './routes/company';
import school from './routes/school';
import rootRouter from './routes';

const router = Router();

router.use('/v1/', auth, admin, rootRouter, company, school);

export default router;
