/**
 * @file Implements DAO managing data storage of follows. Uses mongoose FollowModel
 * to integrate with MongoDB
 */
import FollowDaoI from "../interfaces/FollowDaoI";
import Follow from "../models/Follow";
import FollowModel from "../mongoose/FollowModel";

/**
 * @class FollowDao Implements Data Access Object managing data storage
 * of Follows
 * @property {FollowDao} followDao Private single instance of FollowDao
 */
export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns FollowDao
     */
    public static getInstance = (): FollowDao => {
        if(FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }
    private constructor() {}

    /**
     * Inserts follow instance into the database
     * @param {string} follower Primary key of the user that is the follower
     * @param {string} following Primary key of the user that the follower is following
     * @returns Promise To be notified when the follow is inserted into the database
     */
    userFollowsUser = async (follower: string, following: string): Promise<Follow> =>
        FollowModel.create({follower, following});

    /**
     * Removes follow from the database
     * @param {string} follower Primary key of the user that is unfollowing another user
     * @param {string} following Primary key of the user that the follower is unfollowing
     * @returns Promise To be notified when follow is removed from the database
     */
    userUnfollowsUser = async (follower: string, following: string): Promise<any> =>
        FollowModel.deleteOne({follower, following});

    /**
     * Uses FollowModel to retrieve all follow documents from follows collection where
     * a given user is being followed (other users are following this user)
     * @param {string} me Primary key of the user that is being followed (other users
     * are following this user)
     * @returns Promise To be notified when follows are retrieved from database
     */
    findWhoIsFollowingMe = async (me: string): Promise<Follow[]> =>
        FollowModel
            .find({following: me})
            .populate("follower")
            .exec();

    /**
     * Uses FollowModel to retrieve all follow documents from follows collection where
     * a given user is the follower
     * @param {string} me Primary key of the user that is the follower
     * @returns Promise To be notified when follows are retrieved from database
     */
    findWhoIAmFollowing = async (me: string): Promise<Follow[]> =>
        FollowModel
            .find({follower: me})
            .populate("following")
            .exec();

    /**
     * Uses FollowModel to retrieve single follow document from follows collection where
     * me is the follower and user is the one being followed
     * @param {string} me Primary key of the user that is the follower
     * @param {string} user Primary key of the user that the follower is following
     * @returns Promise To be notified when follow is retrieved from the database
     */
    findUserIAmFollowing = async (me: string, user: string): Promise<any> =>
        FollowModel
            .findOne({follower: me, following: user})
            .populate("following")
            .exec();

    /**
     * Uses FollowModel to retrieve single follow document from follows collection where
     * user is the follower and me is the one being followed
     * @param {string} user Primary key of the user that is the follower
     * @param {string} me Primary key of the user that the follower is following
     * @returns Promise To be notified when follow is retrieved from the database
     */
    findUserFollowingMe = async (user: string, me: string): Promise<any> =>
        FollowModel
            .findOne({follower: user, following: me})
            .populate("follower")
            .exec();
}