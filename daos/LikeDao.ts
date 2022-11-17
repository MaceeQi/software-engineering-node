/**
 * @file Implements DAO managing data storage of likes. Uses mongoose LikeModel
 * to integrate with MongoDB
 */
import LikeDaoI from "../interfaces/LikeDaoI";
import Like from "../models/Like";
import LikeModel from "../mongoose/LikeModel";
import TuitModel from "../mongoose/TuitModel";

/**
 * @class LikeDao Implements Data Access Object managing data storage
 * of Likes
 * @property {LikeDao} likeDao Private single instance of LikeDao
 */
export default class LikeDao implements LikeDaoI {
    private static likeDao: LikeDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns LikeDao
     */
    public static getInstance = (): LikeDao => {
        if(LikeDao.likeDao === null) {
            LikeDao.likeDao = new LikeDao();
        }
        return LikeDao.likeDao;
    }
    private constructor() {}

    /**
     * Uses LikeModel to retrieve all like documents from likes collection where
     * a given tuit was liked
     * @param {string} tid Primary key of the tuit that was liked by users
     * @returns Promise To be notified when the likes are retrieved from database
     */
    findAllUsersThatLikedTuit = async (tid: string): Promise<Like[]> =>
        LikeModel
            .find({tuit: tid, type: "LIKED"})
            .populate("likedBy")
            .exec();

    /**
     * Uses LikeModel to retrieve all like documents from likes collection where
     * tuits were liked by a given user
     * @param {string} uid Primary key of the user that liked tuits
     * @returns Promise To be notified when the likes are retrieved from database
     */
    findAllTuitsLikedByUser = async (uid: string): Promise<Like[]> =>
        LikeModel
            .find({likedBy: uid, type: "LIKED"})
            .populate("tuit")
            .exec();

    /**
     * Inserts like instance into the database
     * @param {string} uid Primary key of the user that liked the tuit
     * @param {string} tid Primary key of the tuit that was liked by user
     * @returns Promise To be notified when like is inserted into the database
     */
    userLikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.create({tuit: tid, likedBy: uid, type: "LIKED"});

    /**
     * Removes like from the database
     * @param {string} uid Primary key of the user that unliked the tuit
     * @param {string} tid Primary key of the tuit that was unliked by user
     * @returns Promise To be notified when like is removed from the database
     */
    userUnlikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.deleteOne({tuit: tid, likedBy: uid});

    /**
     * Uses LikeModel to retrieve a like document from likes collection where a user
     * liked a particular tuit
     * @param {string} uid Primary key of the user that liked the particular tuit
     * @param {string} tid Primary key of the tuit that was liked by a particular user
     * @returns Promise To be notified when like is retrieved from database
     */
    findUserLikesTuit = async (uid: string, tid: string): Promise<Like> =>
        LikeModel.findOne({tuit: tid, likedBy: uid, type: "LIKED"});

    /**
     * Uses LikeModel to count how many like documents there are for a given tuit
     * @param {string} tid Primary key of the tuit that has likes
     * @returns Promise To be notified when count of likes is retrieved from database
     */
    countHowManyLikedTuit = async (tid: string): Promise<any> => {
        const count = await LikeModel.count({tuit: tid, type: "LIKED"});
        return count;
    }

    findUserDislikesTuit = async (uid: string, tid: string): Promise<Like> =>
        LikeModel.findOne({tuit: tid, likeBy: uid, type: "DISLIKED"});

    updateLike = async (uid: string, tid: string, type: string): Promise<any> => {
        return LikeModel.updateOne(
            {tuit: tid, likedBy: uid},
            {$set: {type}})
    }

    countHowManyDislikedTuit = async (tid: string): Promise<any> => {
        const count = await LikeModel.count({tuit: tid, type: "DISLIKED"});
        return count;
    }

    userDislikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.create({tuit: tid, likedBy: uid, type: "DISLIKED"});
}