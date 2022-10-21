/* Controller class that implements the UserControllerI interface using the UserDaoI to interact
with the database
 */

import {Request, Response, Express} from "express";
import UserDao from "../daos/UserDao";
import UserControllerI from "../interfaces/UserControllerI";

export default class UserController implements UserControllerI {
    private static userDao: UserDao = UserDao.getInstance();
    private static userController: UserController | null = null;

    public static getInstance = (app: Express): UserController => {
        if(UserController.userController === null) {
            UserController.userController = new UserController();

            app.get('/api/users', UserController.userController.findAllUsers);
            app.get('/api/users/:userid', UserController.userController.findUserById);
            app.post('/api/users', UserController.userController.createUser);
            app.delete('/api/users/:userid', UserController.userController.deleteUser);
            app.put('/api/users/:userid', UserController.userController.updateUser);
        }
        return UserController.userController;
    }
    private constructor() {}

    findAllUsers = (req: Request, res: Response) =>
        UserController.userDao.findAllUsers()
            .then(users => res.json(users));

    findUserById = (req: Request, res: Response) =>
        UserController.userDao.findUserById(req.params.userid)
            .then(user => res.json(user));

    createUser = (req: Request, res: Response) =>
        UserController.userDao.createUser(req.body)
            .then(user => res.json(user));

    deleteUser = (req: Request, res: Response) =>
        UserController.userDao.deleteUser(req.params.userid)
            .then(status => res.json(status));

    updateUser = (req: Request, res: Response) =>
        UserController.userDao.updateUser(req.params.userid, req.body)
            .then(status => res.json(status));
}
