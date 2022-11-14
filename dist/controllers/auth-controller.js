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
const AuthenticationController = (app) => {
    const userDao = UserDao_1.default.getInstance();
    const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = req.body;
        const password = newUser.password;
        // Encrypt password before storing user
        const hash = yield bcrypt.hash(password, saltRounds);
        newUser.password = hash;
        const existingUser = yield userDao.findUserByUsername(req.body.username);
        if (existingUser) {
            res.sendStatus(403);
            return;
        }
        else {
            const insertedUser = yield userDao.createUser(newUser);
            insertedUser.password = '';
            // Store new user in session under profile attribute - now currently logged in user
            req.session['profile'] = insertedUser;
            res.json(insertedUser);
        }
    });
    const profile = (req, res) => {
        const profile = req.session['profile'];
        if (profile) {
            profile.password = '';
            res.json(profile);
        }
        else {
            res.sendStatus(403);
        }
    };
    const logout = (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    };
    app.post("/api/auth/signup", signup);
    app.post("/api/auth/profile", profile);
    app.post("/api/auth/logout", logout);
};
exports.default = AuthenticationController;
//# sourceMappingURL=auth-controller.js.map