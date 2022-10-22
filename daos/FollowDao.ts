import FollowDaoI from "../interfaces/FollowDaoI";
import Follow from "../models/Follow";
import FollowModel from "../mongoose/FollowModel";

export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;
    public static getInstance = (): FollowDao => {
        if(FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }
    private constructor() {}

    userFollowsUser = async (follower: string, following: string): Promise<Follow> =>
        FollowModel.create({follower, following});

    userUnfollowsUser = async (follower: string, following: string): Promise<any> =>
        FollowModel.deleteOne({follower, following});

    findWhoIsFollowingMe = async (me: string): Promise<Follow[]> =>
        FollowModel
            .find({following: me})
            .populate("follower")
            .exec();

    findWhoIAmFollowing = async (me: string): Promise<Follow[]> =>
        FollowModel
            .find({follower: me})
            .populate("following")
            .exec();

    findUserIAmFollowing = async (me: string, user: string): Promise<any> =>
        FollowModel
            .findOne({follower: me, following: user})
            .populate("following")
            .exec();

    findUserFollowingMe = async (user: string, me: string): Promise<any> =>
        FollowModel
            .findOne({follower: user, following: me})
            .populate("follower")
            .exec();
}