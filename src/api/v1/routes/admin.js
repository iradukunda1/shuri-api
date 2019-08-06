import { Router } from 'express';
import AdminController from '../controllers/adminControllers';
import adminValidator from '../controllers/adminControllers/validateAdmin';
import authenticate from '../../../middleware/authenticate';
import authorize from '../../../middleware/authorize';
import { superAdmin, accountantAdmin } from '../../../utils/roles';

const adminRouters = Router();
adminRouters.all('*', authenticate);
adminRouters
  .post(
    '/admins',
    authorize(superAdmin),
    adminValidator,
    AdminController.create
  )
  .get(
    '/admins',
    authorize(superAdmin, accountantAdmin),
    AdminController.findAll
  )
  .get(
    '/admins/:id',
    authorize(superAdmin, accountantAdmin),
    AdminController.findOne
  );

export default adminRouters;
