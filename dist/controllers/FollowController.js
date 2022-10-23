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
const FollowDao_1 = __importDefault(require("../daos/FollowDao"));
/**
 * @class FollowController Implements RESTful Web service API for follows resource
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:follower/follows/:following to create a new follow instance</li>
 *     <li>DELETE /api/users/:follower/unfollows/:following to remove a particular follow instance</li>
 *     <li>GET /api/users/:me/follows/followers to retrieve users that are followers of a given user</li>
 *     <li>GET /api/users/:me/follows/followings to retrieve users that a given user is following</li>
 *     <li>GET /api/users/:me/follows/:user/following to retrieve a particular user that a given
 *     user is following</li>
 *     <li>GET /api/users/:user/follows/:me/follower to retrieve a particular user that is the
 *     follower of a given user</li>
 * </ul>
 * @property {FollowDao} followDao Singleton DAO implementing follow CRUD operations
 * @property {FollowController} followController Singleton controller implementing
 * RESTful Web service API
 */
class FollowController {
    constructor() {
        /**
         * Creates a new follow instance
         * @param {Request} req Represents request from client, including the
         * path parameters follower and following representing the user that
         * is the follower and the user that the follower is following
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON containing the new follow that was inserted in the
         * database
         */
        this.userFollowsUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const follower = req.params.follower;
            const following = req.params.following;
            const follow = yield FollowController.followDao.userFollowsUser(follower, following);
            res.json(follow);
        });
        /**
         * Removes a follow instance from the database
         * @param {Request} req Represents request from client, including path
         * parameter follower and following representing the user that is the follower
         * and the user that the follower is following
         * @param {Response} res Represents response to client, including status
         * on whether deleting a follow was successful or not
         */
        this.userUnfollowsUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const follower = req.params.follower;
            const following = req.params.following;
            const status = yield FollowController.followDao.userUnfollowsUser(follower, following);
            res.json(status);
        });
        /**
         * Retrieves all users that are the followers of a given user from the database and
         * returns an array of users
         * @param {Request} req Represents request from client, including path
         * parameter me identifying the primary key of the given user that other
         * users are following
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the user objects
         */
        this.findWhoIsFollowingMe = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const me = req.params.me;
            const users = yield FollowController.followDao.findWhoIsFollowingMe(me);
            res.json(users);
        });
        /**
         * Retrieves all users that a given user is following from the database and
         * returns an array of users
         * @param {Request} req Represents request from client, including path
         * parameter me identifying the primary key of the given user that is
         * the follower
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the user objects
         */
        this.findWhoIAmFollowing = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const me = req.params.me;
            const users = yield FollowController.followDao.findWhoIAmFollowing(me);
            res.json(users);
        });
        /**
         * Retrieves a specific user from the database if a given user is following them
         * @param {Request} req Represents request from client, including path
         * parameter me identifying the primary key of the given user that is the follower
         * and the parameter user identifying the primary key of the user to be retrieved if
         * they are being followed by the follower
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON containing the user object that matches user ID and
         * is followed by me
         */
        this.findUserIAmFollowing = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const me = req.params.me;
            const user = req.params.user;
            const result = yield FollowController.followDao.findUserIAmFollowing(me, user);
            res.json(result);
        });
        /**
         * Retrieves a specific user from the database if that user is the follower of
         * a given user
         * @param {Request} req Represents request from client, including path
         * parameter user and me identifying the primary keys of two users. User is
         * the specific user to be retrieved if they are a follower that is following me
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON containing the user object that matches user ID and
         * is a follower that is following me
         */
        this.findUserFollowingMe = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = req.params.user;
            const me = req.params.me;
            const result = yield FollowController.followDao.findUserFollowingMe(user, me);
            res.json(result);
        });
    }
}
exports.default = FollowController;
FollowController.followDao = FollowDao_1.default.getInstance();
FollowController.followController = null;
/**
 * Creates singleton controller instance
 * @param {Express} app Express instance to declare the RESTful Web service
 * API
 * @return FollowController
 */
FollowController.getInstance = (app) => {
    if (FollowController.followController === null) {
        FollowController.followController = new FollowController();
        app.post("/api/users/:follower/follows/:following", FollowController.followController.userFollowsUser);
        app.delete("/api/users/:follower/unfollows/:following", FollowController.followController.userUnfollowsUser);
        app.get("/api/users/:me/follows/followers", FollowController.followController.findWhoIsFollowingMe);
        app.get("/api/users/:me/follows/followings", FollowController.followController.findWhoIAmFollowing);
        app.get("/api/users/:me/follows/:user/following", FollowController.followController.findUserIAmFollowing);
        app.get("/api/users/:user/follows/:me/follower", FollowController.followController.findUserFollowingMe);
    }
    return FollowController.followController;
};
//# sourceMappingURL=FollowController.js.map