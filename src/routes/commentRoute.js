import { Router } from 'express';
import CommentControler from '../controllers/commentController';

import LoginRequired from '../middlewares/loginRequired';
import loginRequired from '../middlewares/loginRequired';
import { checkUserPermission } from '../middlewares/checkUserPermission';

const router = new Router();

router.post('/:postId', LoginRequired, CommentControler.post);
router.delete('/:postId', loginRequired, checkUserPermission, CommentControler.delete)


export default router;