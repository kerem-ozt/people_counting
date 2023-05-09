import UserControllers from '../controllers/user.js';
import express from 'express';

const UserRouter = express.Router();

UserRouter.post('/register', UserControllers.register);

export default UserRouter;