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
  .post(
    '/drivers/:id/buses/:busId',
    authorize(busCompany),
    DriverController.assignBus
  ) // assign bus to a driver
  .delete(
    '/drivers/:id/buses/:busId',
    authorize(busCompany),
    DriverController.removeBus
  ) // remove a bus from a driver
  .delete('/companies/:companyId/drivers/:id', DriverController.destroy);
export default driverRouters;
