import UserControllers from '../controllers/user.js';
import express from 'express';

const UserRouter = express.Router();

UserRouter.post('/register', UserControllers.register);
UserRouter.get('/getall', UserControllers.getAll);
UserRouter.delete('/delete/:uid', UserControllers.delete);
UserRouter.put('/update/:uid', UserControllers.update);
UserRouter.get('/get/:uid', UserControllers.get);
UserRouter.post('/login', UserControllers.login);
UserRouter.post('/logout', UserControllers.logout);

export default UserRouter;