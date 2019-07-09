import { Router } from 'express';
import AdminController from '../controllers/adminController';
import adminValidator from '../../../validators/validateAdmin';

const AdminRouters = Router();

AdminRouters.post('/admins', adminValidator, AdminController.create);

export default AdminRouters;
