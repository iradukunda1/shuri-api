import { Router } from 'express';
import rootRouter from './routes';
import admin from './routes/admin';
import auth from './routes/auth';
import company from './routes/company';
import school from './routes/school';
import driver from './routes/driver';
import bus from './routes/bus';
import schoolUser from './routes/schoolUser';

const router = Router();

router.use(
  '/v1/',
  auth,
  admin,
  rootRouter,
  company,
  school,
  driver,
  bus,
  schoolUser
);

export default router;
