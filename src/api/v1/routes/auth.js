import { Router } from 'express';
import AuthController from '../controllers/authControllers';
import validate from '../controllers/authControllers/validate';
import authenticate from '../../../middleware/authenticate';

const authRouters = Router();

authRouters
  .post('/admins/auth', validate, AuthController.admin)
  .get('/current', authenticate, AuthController.current);

export default authRouters;
