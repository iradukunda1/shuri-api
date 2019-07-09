import { Router } from 'express';
import passport from 'passport';
import AuthController from '../controllers/authControllers';
import validate from '../controllers/authControllers/validate';

const authRouters = Router();

authRouters
  .post('/admins/auth', validate, AuthController.admin)
  .get(
    '/current',
    passport.authenticate('jwt', { session: false }),
    AuthController.current
  );

export default authRouters;
