import express from 'express';
import PostController from '../controllers/postController';
import LoginRequired from '../middlewares/loginRequired'
import { checkUserPermission } from '../middlewares/checkUserPermission';

const router = express.Router();
const postController = new PostController();

// Certifique-se de que está chamando o método 'post' corretamente
router.post('/', LoginRequired,  postController.post.bind(postController));
router.get('/:id', LoginRequired, postController.getId.bind(postController))
router.delete('/:id', LoginRequired, checkUserPermission, postController.deletePost.bind(postController))
router.put('/:id', LoginRequired, checkUserPermission, postController.put.bind(postController))

export default router;
