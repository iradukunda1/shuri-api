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
    '/school-users',
    authorize(schoolPrincipal),
    validate,
    SchoolUserController.create
  )
  .get('/schools/:schoolId/school-users', SchoolUserController.findAll)
  .get('/school-users/:id', SchoolUserController.find)
  .put(
    '/school-users/:id',
    authorize(schoolPrincipal),
    SchoolUserController.update
  )
  .delete(
    '/school-users/:id',
    authorize(schoolPrincipal),
    isPrincipal,
    SchoolUserController.delete
  );

export default routers;
