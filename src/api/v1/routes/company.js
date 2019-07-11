import { Router } from 'express';
import CompanyController from '../controllers/busCompanyControllers';
import validateCompany from '../controllers/busCompanyControllers/validateCompany';
import authenticate from '../../../middleware/authenticate';
import authorize from '../../../middleware/authorize';

const companyRouters = Router();
companyRouters.all('*', authenticate);
companyRouters
  .get('/companies', CompanyController.findAll)
  .post(
    '/companies',
    authorize('admin'),
    validateCompany,
    CompanyController.create
  )
  .put(
    '/companies/:id',
    authorize('admin'),
    validateCompany,
    CompanyController.update
  )
  .get('/companies/:id', CompanyController.find)
  .delete('/companies/:id', authorize('admin'), CompanyController.destroy);

export default companyRouters;
