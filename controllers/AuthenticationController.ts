import UserDao from "../daos/UserDao";
import {Express} from "express";
import AuthenticationControllerI from "../interfaces/AuthenticationControllerI";

const bcrypt = require('bcrypt');
const saltRounds = 10;

export default class AuthenticationController implements AuthenticationControllerI {
    private static userDao: UserDao = UserDao.getInstance();
    private static authenticationController: AuthenticationController | null = null;

    public static getInstance = (app: Express): AuthenticationController => {
        if (AuthenticationController.authenticationController === null) {
            AuthenticationController.authenticationController = new AuthenticationController();

            app.post("/api/auth/signup", AuthenticationController.authenticationController.signup);
            app.post("/api/auth/profile", AuthenticationController.authenticationController.profile);
            app.post("/api/auth/logout", AuthenticationController.authenticationController.logout);
            app.post("/api/auth/login", AuthenticationController.authenticationController.login);
        }
        return AuthenticationController.authenticationController;
    }
    private constructor() {}

    signup = async (req, res) => {
        const newUser = req.body;
        const password = newUser.password;
        // Encrypt password before storing user
        const hash = await bcrypt.hash(password, saltRounds);
        newUser.password = hash;

        const existingUser = await AuthenticationController.userDao.findUserByUsername(req.body.username);
        if (existingUser) {
            res.sendStatus(403);
            return;
        } else {
            const insertedUser = await AuthenticationController.userDao.createUser(newUser);
            insertedUser.setPassword('');
            // Store new user in session under profile attribute - now currently logged in user
            req.session['profile'] = insertedUser;
            res.json(insertedUser);
        }
    }

    profile = (req, res) => {
        const profile = req.session['profile'];
        if (profile) {
            profile.password = "";
            res.json(profile);
        } else {
            res.sendStatus(403);
        }
    }

    logout = (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    }

    login = async (req, res) => {
        const user = req.body;
        const username = user.username;
        const password = user.password;

        const existingUser = await AuthenticationController.userDao.findUserByUsername(username);

        if (!existingUser) {
            res.sendStatus(403);
            return;
        }

        // Compare user object's password to hashed password passed from client
        const match = await bcrypt.compare(password, existingUser.password);

        if (match) {
            // Password match: user object stored in profile attr in session - indicates user currently logged in
            existingUser.password = '*****';
            req.session['profile'] = existingUser;
            res.json(existingUser);
        } else {
            // Password doesn't match: forbidden error 403
            res.sendStatus(403);
        }
    };
}