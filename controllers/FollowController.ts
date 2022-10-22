import FollowControllerI from "../interfaces/FollowControllerI";
import FollowDao from "../daos/FollowDao";
import {Express, Request, Response} from "express";

export default class FollowController implements FollowControllerI {
    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;
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

    userFollowsUser = async (req: Request, res: Response) => {
        const follower = req.params.follower;
        const following = req.params.following;
        const follow = await FollowController.followDao.userFollowsUser(follower, following);
        res.json(follow);
    }

    userUnfollowsUser = async (req: Request, res: Response) => {
        const follower = req.params.follower;
        const following = req.params.following;
        const status = await FollowController.followDao.userUnfollowsUser(follower, following);
        res.json(status);
    }

    findWhoIsFollowingMe = async (req: Request, res: Response) => {
        const me = req.params.me;
        const users = await FollowController.followDao.findWhoIsFollowingMe(me);
        res.json(users);
    }

    findWhoIAmFollowing = async (req: Request, res: Response) => {
        const me = req.params.me;
        const users = await FollowController.followDao.findWhoIAmFollowing(me);
        res.json(users);
    }

    findUserIAmFollowing = async (req: Request, res: Response) => {
        const me = req.params.me;
        const user = req.params.user;
        const result = await FollowController.followDao.findUserIAmFollowing(me, user);
        res.json(result);
    }

    findUserFollowingMe = async (req: Request, res: Response) => {
        const user = req.params.user;
        const me = req.params.me;
        const result = await FollowController.followDao.findUserFollowingMe(user, me);
        res.json(result);
    }
}