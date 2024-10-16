import { Router } from 'express';
import LikeController from '../controllers/likeController';
import { likeExist } from '../business/validations/likeValidation';
import LoginRequired from '../middlewares/loginRequired';
import { checkUserPermission } from '../middlewares/checkUserPermission';


const router = new Router();

router.post('/:postId', LoginRequired, likeExist, LikeController.post);
router.delete('/:postId', LoginRequired, checkUserPermission, LikeController.delete);


export default router;
