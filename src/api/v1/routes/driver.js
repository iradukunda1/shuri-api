import { Router } from 'express';
import authenticate from '../../../middleware/authenticate';
import DriverController from '../controllers/driverControllers';
import validate from '../controllers/driverControllers/validate';
import authorize from '../../../middleware/authorize';

const driverRouters = Router();
driverRouters.all('*', authenticate);
driverRouters
  .post('/drivers', authorize('admin'), validate, DriverController.create)
  .get('/drivers', DriverController.findAll)
  .get('/drivers/:id', DriverController.find)
  .put('/drivers/:id', DriverController.update)
  .delete('/drivers/:id', DriverController.destroy);
export default driverRouters;
