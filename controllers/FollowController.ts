/**
 * @file Controller RESTful Web service API for follows resource
 */
import FollowControllerI from "../interfaces/FollowControllerI";
import FollowDao from "../daos/FollowDao";
import {Express, Request, Response} from "express";

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
export default class FollowController implements FollowControllerI {
    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return FollowController
     */
    public static getInstance = (app: Express): FollowController => {
        if(FollowController.followController === null) {
            FollowController.followController = new FollowController();
            app.post("/api/users/:follower/follows/:following", FollowController.followController.userFollowsUser);
            app.delete("/api/users/:follower/unfollows/:following", FollowController.followController.userUnfollowsUser);
            app.get("/api/users/:me/follows/followers", FollowController.followController.findWhoIsFollowingMe);
            app.get("/api/users/:me/follows/followings", FollowController.followController.findWhoIAmFollowing);
            app.get("/api/users/:me/follows/:user/following", FollowController.followController.findUserIAmFollowing);
            app.get("/api/users/:user/follows/:me/follower", FollowController.followController.findUserFollowingMe);
        }
        return FollowController.followController;
    }
    private constructor() {}

    /**
     * Creates a new follow instance
     * @param {Request} req Represents request from client, including the
     * path parameters follower and following representing the user that
     * is the follower and the user that the follower is following
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new follow that was inserted in the
     * database
     */
    userFollowsUser = async (req: Request, res: Response) => {
        const follower = req.params.follower;
        const following = req.params.following;
        const follow = await FollowController.followDao.userFollowsUser(follower, following);
        res.json(follow);
    }

    /**
     * Removes a follow instance from the database
     * @param {Request} req Represents request from client, including path
     * parameter follower and following representing the user that is the follower
     * and the user that the follower is following
     * @param {Response} res Represents response to client, including status
     * on whether deleting a follow was successful or not
     */
    userUnfollowsUser = async (req: Request, res: Response) => {
        const follower = req.params.follower;
        const following = req.params.following;
        const status = await FollowController.followDao.userUnfollowsUser(follower, following);
        res.json(status);
    }

    /**
     * Retrieves all users that are the followers of a given user from the database and
     * returns an array of users
     * @param {Request} req Represents request from client, including path
     * parameter me identifying the primary key of the given user that other
     * users are following
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findWhoIsFollowingMe = async (req: Request, res: Response) => {
        const me = req.params.me;
        const users = await FollowController.followDao.findWhoIsFollowingMe(me);
        res.json(users);
    }

    /**
     * Retrieves all users that a given user is following from the database and
     * returns an array of users
     * @param {Request} req Represents request from client, including path
     * parameter me identifying the primary key of the given user that is
     * the follower
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findWhoIAmFollowing = async (req: Request, res: Response) => {
        const me = req.params.me;
        const users = await FollowController.followDao.findWhoIAmFollowing(me);
        res.json(users);
    }

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
    findUserIAmFollowing = async (req: Request, res: Response) => {
        const me = req.params.me;
        const user = req.params.user;
        const result = await FollowController.followDao.findUserIAmFollowing(me, user);
        res.json(result);
    }

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
    findUserFollowingMe = async (req: Request, res: Response) => {
        const user = req.params.user;
        const me = req.params.me;
        const result = await FollowController.followDao.findUserFollowingMe(user, me);
        res.json(result);
    }
}