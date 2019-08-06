import { Router } from 'express';
import authenticate from '../../../middleware/authenticate';
import BusController from '../controllers/busControllers';
import validate from '../controllers/busControllers/validate';
import authorize from '../../../middleware/authorize';
import { busCompany } from '../../../utils/roles';

const busRouters = Router();
busRouters.all('*', authenticate);
busRouters
  .post(
    '/companies/:companyId/buses',
    validate,
    authorize(busCompany),
    BusController.create
  )
  .get('/companies/:companyId/buses', BusController.findAll)
  .get('/companies/:companyId/buses/:id', BusController.find)
  .put(
    '/companies/:companyId/buses/:id',
    authorize(busCompany),
    BusController.update
  )
  .delete(
    '/companies/:companyId/buses/:id',
    authorize(busCompany),
    BusController.destroy
  );
export default busRouters;
