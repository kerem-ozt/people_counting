import UserControllers from '../controllers/user.js';
import express from 'express';
import { verifyToken } from '../../utils/verifyToken.js';

const UserRouter = express.Router();

UserRouter.post('/register', UserControllers.register);
UserRouter.get('/getall', verifyToken, UserControllers.getAll);
UserRouter.delete('/delete/:uid', verifyToken, UserControllers.delete);
UserRouter.put('/update/:uid', verifyToken, UserControllers.update);
UserRouter.get('/get/:uid', verifyToken, UserControllers.get);
UserRouter.post('/login', UserControllers.login);
UserRouter.post('/logout', UserControllers.logout);

export default UserRouter;