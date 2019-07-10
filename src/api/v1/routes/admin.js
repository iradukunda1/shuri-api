import { Router } from 'express';
import AdminController from '../controllers/adminControllers';
import adminValidator from '../controllers/adminControllers/validateAdmin';
import authenticate from '../../../middleware/authenticate';
import CompanyController from '../controllers/companyControllers';
import validateCompany from '../controllers/companyControllers/validateCompany';

const adminRouters = Router();

adminRouters
  .post('/admins', adminValidator, AdminController.create)
  .get('/admins', authenticate, AdminController.findAll)
  .get('/admins/:id', authenticate, AdminController.findOne)
  .get('/companies', authenticate, CompanyController.findAll)
  .post('/companies', authenticate, validateCompany, CompanyController.create);

export default adminRouters;
