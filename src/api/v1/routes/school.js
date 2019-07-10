import { Router } from 'express';
import SchoolController from '../controllers/schoolControllers';
import authenticate from '../../../middleware/authenticate';

const schoolRouters = Router();
/**
 * please handle validation and authorization
 * (for authorization look for a page)
 */
schoolRouters
  .post('/schools', authenticate, SchoolController.create)
  .get('/schools', authenticate, SchoolController.findAll)
  .get('/schools/:id', authenticate, SchoolController.find)
  .put('/schools/:id', authenticate, SchoolController.update)
  .delete('/schools/:id', authenticate, SchoolController.destroy);

export default schoolRouters;
