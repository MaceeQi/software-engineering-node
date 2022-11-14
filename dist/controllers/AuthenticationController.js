"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserDao_1 = __importDefault(require("../daos/UserDao"));
const bcrypt = require('bcrypt');
const saltRounds = 10;
class AuthenticationController {
    constructor() {
        this.signup = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const newUser = req.body;
            const password = newUser.password;
            // Encrypt password before storing user
            const hash = yield bcrypt.hash(password, saltRounds);
            newUser.password = hash;
            const existingUser = yield AuthenticationController.userDao.findUserByUsername(req.body.username);
            if (existingUser) {
                res.sendStatus(403);
                return;
            }
            else {
                const insertedUser = yield AuthenticationController.userDao.createUser(newUser);
                insertedUser.setPassword('');
                // Store new user in session under profile attribute - now currently logged in user
                req.session['profile'] = insertedUser;
                res.json(insertedUser);
            }
        });
        this.profile = (req, res) => {
            const profile = req.session['profile'];
            if (profile) {
                profile.password = "";
                res.json(profile);
            }
            else {
                res.sendStatus(403);
            }
        };
        this.logout = (req, res) => {
            req.session.destroy();
            res.sendStatus(200);
        };
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = req.body;
            const username = user.username;
            const password = user.password;
            const existingUser = yield AuthenticationController.userDao.findUserByUsername(username);
            if (!existingUser) {
                res.sendStatus(403);
                return;
            }
            // Compare user object's password to hashed password passed from client
            const match = yield bcrypt.compare(password, existingUser.password);
            if (match) {
                // Password match: user object stored in profile attr in session - indicates user currently logged in
                existingUser.password = '*****';
                req.session['profile'] = existingUser;
                res.json(existingUser);
            }
            else {
                // Password doesn't match: forbidden error 403
                res.sendStatus(403);
            }
        });
    }
}
exports.default = AuthenticationController;
AuthenticationController.userDao = UserDao_1.default.getInstance();
AuthenticationController.authenticationController = null;
AuthenticationController.getInstance = (app) => {
    if (AuthenticationController.authenticationController === null) {
        AuthenticationController.authenticationController = new AuthenticationController();
        app.post("/api/auth/signup", AuthenticationController.authenticationController.signup);
        app.post("/api/auth/profile", AuthenticationController.authenticationController.profile);
        app.post("/api/auth/logout", AuthenticationController.authenticationController.logout);
        app.post("/api/auth/login", AuthenticationController.authenticationController.login);
    }
    return AuthenticationController.authenticationController;
};
//# sourceMappingURL=AuthenticationController.js.map