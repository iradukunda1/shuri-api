import { Router } from 'express';
import SchoolController from '../controllers/schoolControllers';
import authenticate from '../../../middleware/authenticate';
import validateSchool from '../controllers/schoolControllers/schoolValidator';
import authorize from '../../../middleware/authorize';

const schoolRouters = Router();
schoolRouters.all('*', authenticate);
schoolRouters
  .post('/schools', authorize('admin'), validateSchool, SchoolController.create)
  .get('/schools', SchoolController.findAll)
  .get('/schools/:id', SchoolController.find)
  .put('/schools/:id', authorize('admin'), SchoolController.update)
  .delete('/schools/:id', authorize('admin'), SchoolController.destroy);

export default schoolRouters;
