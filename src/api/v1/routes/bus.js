import { Router } from 'express';
import authenticate from '../../../middleware/authenticate';
import BusController from '../controllers/busControllers';
import validate from '../controllers/busControllers/validate';
import authorize from '../../../middleware/authorize';

const busRouters = Router();
busRouters.all('*', authenticate);
busRouters
  .post('/buses', validate, authorize('BusCompany'), BusController.create)
  .get('/buses', BusController.findAll)
  .get('/buses/:id', BusController.find)
  .put('/buses/:id', authorize('BusCompany'), BusController.update)
  .delete('/buses/:id', authorize('BusCompany'), BusController.destroy);
export default busRouters;
