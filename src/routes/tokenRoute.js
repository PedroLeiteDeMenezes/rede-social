import { Router } from 'express';
import TokenController from '../controllers/tokenController';

const router = new Router();

router.post('/', TokenController.post);

export default router;
