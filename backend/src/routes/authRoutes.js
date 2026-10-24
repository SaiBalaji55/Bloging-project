import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import {register, login, me} from '../controller/authController.js';

const routes = express.Router();

routes.post('/register', register);
routes.post('/login', login);
routes.get('/me', authMiddleware, me);

export default routes;