import { Router } from 'express';
import AdminController from '../controllers/adminControllers';
import adminValidator from '../controllers/adminControllers/validateAdmin';
import authenticate from '../../../middleware/authenticate';
import authorize from '../../../middleware/authorize';
import { superAdmin, accountantAdmin } from '../../../utils/roles';

const adminRouters = Router();

adminRouters
  .post('/admins', adminValidator, AdminController.create)
  .get(
    '/admins',
    authenticate,
    authorize(superAdmin, accountantAdmin),
    AdminController.findAll
  )
  .get(
    '/admins/:id',
    authenticate,
    authorize(superAdmin, accountantAdmin),
    AdminController.findOne
  );

export default adminRouters;
