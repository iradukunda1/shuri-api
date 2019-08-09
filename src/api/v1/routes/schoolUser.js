import { Router } from 'express';
import authenticate from '../../../middleware/authenticate';
import SchoolUserController from '../controllers/schoolUserControllers';
import validate from '../controllers/schoolUserControllers/validator';
import authorize from '../../../middleware/authorize';
import isPrincipal from '../controllers/schoolUserControllers/isPrincipal';
import { schoolPrincipal } from '../../../utils/roles';

const routers = Router();
routers.all('*', authenticate);
routers
  .post(
    '/users',
    authorize(schoolPrincipal),
    validate,
    SchoolUserController.create
  )
  .get('/schools/:schoolId/users', SchoolUserController.findAll)
  .get('/users/:id', SchoolUserController.find)
  .put(
    '/users/:id',
    authorize(schoolPrincipal),
    SchoolUserController.update
  )
  .delete(
    '/users/:id',
    authorize(schoolPrincipal),
    isPrincipal,
    SchoolUserController.delete
  );

export default routers;
