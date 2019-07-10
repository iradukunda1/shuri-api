import { Router } from 'express';
import passport from 'passport';
import AdminController from '../controllers/adminControllers';
import adminValidator from '../controllers/adminControllers/validateAdmin';

const adminRouters = Router();

adminRouters
  .post('/admins', adminValidator, AdminController.create)
  .get(
    '/admins',
    passport.authenticate('jwt', { session: false }),
    AdminController.findAll
  )
  .get(
    '/admins/:id',
    passport.authenticate('jwt', { session: false }),
    AdminController.findOne
  );

export default adminRouters;
