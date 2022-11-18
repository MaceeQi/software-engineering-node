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
const LikeModel_1 = __importDefault(require("../mongoose/LikeModel"));
/**
 * @class LikeDao Implements Data Access Object managing data storage
 * of Likes
 * @property {LikeDao} likeDao Private single instance of LikeDao
 */
class LikeDao {
    constructor() {
        /**
         * Uses LikeModel to retrieve all like documents from likes collection where
         * a given tuit was liked
         * @param {string} tid Primary key of the tuit that was liked by users
         * @returns Promise To be notified when the likes are retrieved from database
         */
        this.findAllUsersThatLikedTuit = (tid) => __awaiter(this, void 0, void 0, function* () {
            return LikeModel_1.default
                .find({ tuit: tid, type: "LIKED" })
                .populate("likedBy")
                .exec();
        });
        /**
         * Uses LikeModel to retrieve all like documents from likes collection where
         * tuits were liked by a given user
         * @param {string} uid Primary key of the user that liked tuits
         * @returns Promise To be notified when the likes are retrieved from database
         */
        this.findAllTuitsLikedByUser = (uid) => __awaiter(this, void 0, void 0, function* () {
            return LikeModel_1.default
                .find({ likedBy: uid, type: "LIKED" })
                .populate({
                path: "tuit",
                populate: {
                    path: "postedBy"
                }
            })
                .exec();
        });
        /**
         * Uses LikeModel to retrieve all like documents from likes collection where
         * tuits were disliked by a given user
         * @param {string} uid Primary key of the user that disliked tuits
         * @returns Promise To be notified when the like documents are retrieved from database
         */
        this.findAllTuitsDislikedByUser = (uid) => __awaiter(this, void 0, void 0, function* () {
            return LikeModel_1.default
                .find({ likedBy: uid, type: "DISLIKED" })
                .populate({
                path: "tuit",
                populate: {
                    path: "postedBy"
                }
            })
                .exec();
        });
        /**
         * Inserts like instance into the database, where type is liked
         * @param {string} uid Primary key of the user that liked the tuit
         * @param {string} tid Primary key of the tuit that was liked by user
         * @returns Promise To be notified when like is inserted into the database
         */
        this.userLikesTuit = (uid, tid) => __awaiter(this, void 0, void 0, function* () { return LikeModel_1.default.create({ tuit: tid, likedBy: uid, type: "LIKED" }); });
        /**
         * Removes like instance from the database
         * @param {string} uid Primary key of the user
         * @param {string} tid Primary key of the tuit
         * @returns Promise To be notified when like is removed from the database
         */
        this.userUnlikesTuit = (uid, tid) => __awaiter(this, void 0, void 0, function* () { return LikeModel_1.default.deleteOne({ tuit: tid, likedBy: uid }); });
        /**
         * Uses LikeModel to retrieve a like document from likes collection where a user
         * liked a particular tuit
         * @param {string} uid Primary key of the user that liked the particular tuit
         * @param {string} tid Primary key of the tuit that was liked by a particular user
         * @returns Promise To be notified when like is retrieved from database
         */
        this.findUserLikesTuit = (uid, tid) => __awaiter(this, void 0, void 0, function* () { return LikeModel_1.default.findOne({ tuit: tid, likedBy: uid, type: "LIKED" }); });
        /**
         * Uses LikeModel to count how many like documents there are for a given tuit where
         * the type is liked
         * @param {string} tid Primary key of the tuit that has likes
         * @returns Promise To be notified when count of likes is retrieved from database
         */
        this.countHowManyLikedTuit = (tid) => __awaiter(this, void 0, void 0, function* () {
            const count = yield LikeModel_1.default.count({ tuit: tid, type: "LIKED" });
            return count;
        });
        /**
         * Uses LikeModel to retrieve a like document from likes collection where a user
         * disliked a particular tuit
         * @param {string} uid Primary key of the user that disliked the particular tuit
         * @param {string} tid Primary key of the tuit that was disliked by a particular user
         * @returns Promise To be notified when document is retrieved from database
         */
        this.findUserDislikesTuit = (uid, tid) => __awaiter(this, void 0, void 0, function* () { return LikeModel_1.default.findOne({ tuit: tid, likeBy: uid, type: "DISLIKED" }); });
        /**
         * Finds like document that matches tuit ID (tid) and user ID (uid) and updates
         * the type to the given type
         * @param {string} uid Primary key of the user that liked or disliked the particular tuit
         * @param {string} tid Primary key of the tuit that was liked or disliked by a particular user
         * @param {string} type New type (LIKED or DISLIKED) to change the like document to
         * @returns Promise To be notified when document is updated in database
         */
        this.updateLike = (uid, tid, type) => __awaiter(this, void 0, void 0, function* () {
            return LikeModel_1.default.updateOne({ tuit: tid, likedBy: uid }, { $set: { type } });
        });
        /**
         * Uses LikeModel to count how many like documents there are for a given tuit where
         * the type is disliked
         * @param {string} tid Primary key of the tuit that has dislikes
         * @returns Promise To be notified when count of likes with disliked type is retrieved from database
         */
        this.countHowManyDislikedTuit = (tid) => __awaiter(this, void 0, void 0, function* () {
            const count = yield LikeModel_1.default.count({ tuit: tid, type: "DISLIKED" });
            return count;
        });
        /**
         * Inserts like instance into the database, where type is disliked
         * @param {string} uid Primary key of the user that disliked the tuit
         * @param {string} tid Primary key of the tuit that was disliked by user
         * @returns Promise To be notified when like with type disliked is inserted into the database
         */
        this.userDislikesTuit = (uid, tid) => __awaiter(this, void 0, void 0, function* () { return LikeModel_1.default.create({ tuit: tid, likedBy: uid, type: "DISLIKED" }); });
    }
}
exports.default = LikeDao;
LikeDao.likeDao = null;
/**
 * Creates singleton DAO instance
 * @returns LikeDao
 */
LikeDao.getInstance = () => {
    if (LikeDao.likeDao === null) {
        LikeDao.likeDao = new LikeDao();
    }
    return LikeDao.likeDao;
};
//# sourceMappingURL=LikeDao.js.map