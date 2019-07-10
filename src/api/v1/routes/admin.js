import { Router } from 'express';
import AdminController from '../controllers/adminControllers';
import adminValidator from '../controllers/adminControllers/validateAdmin';
import authenticate from '../../../middleware/authenticate';

const adminRouters = Router();

adminRouters
  .post('/admins', adminValidator, AdminController.create)
  .get('/admins', authenticate, AdminController.findAll)
  .get('/admins/:id', authenticate, AdminController.findOne);

export default adminRouters;
