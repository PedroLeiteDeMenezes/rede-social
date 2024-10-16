import { Router } from 'express';
import UserController from '../controllers/userController';

const router = new Router();

router.post('/login', UserController.login)