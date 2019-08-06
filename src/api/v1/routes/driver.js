import { Router } from 'express';
import authenticate from '../../../middleware/authenticate';
import DriverController from '../controllers/driverControllers';
import validate from '../controllers/driverControllers/validate';
import authorize from '../../../middleware/authorize';
import { busCompany } from '../../../utils/roles';

const driverRouters = Router();
driverRouters.all('*', authenticate);
driverRouters
  .post(
    '/companies/:companyId/drivers',
    authorize(busCompany),
    validate,
    DriverController.create
  )
  .get('/companies/:companyId/drivers', DriverController.findAll)
  .get('/companies/:companyId/drivers/:id', DriverController.find)
  .put('/companies/:companyId/drivers/:id', DriverController.update)
  .delete('/companies/:companyId/drivers/:id', DriverController.destroy);
export default driverRouters;
