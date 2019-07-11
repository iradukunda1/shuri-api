import { Router } from 'express';
import AdminController from '../controllers/adminControllers';
import adminValidator from '../controllers/adminControllers/validateAdmin';
import authenticate from '../../../middleware/authenticate';
import authorize from '../../../middleware/authorize';

const adminRouters = Router();

adminRouters
  .post('/admins', adminValidator, AdminController.create)
  .get('/admins', authenticate, authorize('admin'), AdminController.findAll)
  .get(
    '/admins/:id',
    authenticate,
    authorize('admin'),
    AdminController.findOne
  );

export default adminRouters;
