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
    '/buses',
    validate,
    authorize(busCompany),
    BusController.create
  )
  .get('/companies/:companyId/buses', BusController.findAll)
  .get('/buses/:id', BusController.find)
  .put(
    '/buses/:id',
    authorize(busCompany),
    BusController.update
  )
  .delete(
    '/buses/:id',
    authorize(busCompany),
    BusController.destroy
  );
export default busRouters;
