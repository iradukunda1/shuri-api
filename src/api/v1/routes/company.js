import { Router } from 'express';
import CompanyController from '../controllers/companyControllers';
import validateCompany from '../controllers/companyControllers/validateCompany';
import authenticate from '../../../middleware/authenticate';

const companyRouters = Router();
companyRouters
  .get('/companies', authenticate, CompanyController.findAll)
  .post('/companies', authenticate, validateCompany, CompanyController.create)
  .put(
    '/companies/:id',
    authenticate,
    validateCompany,
    CompanyController.update
  )
  .get('/companies/:id', authenticate, CompanyController.find);

export default companyRouters;
