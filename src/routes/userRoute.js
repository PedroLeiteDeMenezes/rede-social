import { Router } from 'express';
import UserController from '../controllers/userController';
import LoginRequired from '../middlewares/loginRequired'
import { checkUserPermission } from '../middlewares/checkUserPermission';

const router = new Router();

router.post('/', UserController.post)

router.post('/login', UserController.login)

router.put('/:id', LoginRequired, checkUserPermission, UserController.put)

router.get('/:id', LoginRequired, checkUserPermission,
  UserController.getbyId
)

router.get('/', UserController.getAll)

router.delete('/:id', LoginRequired, checkUserPermission, UserController.deleteUser)

export default router;
