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
const FollowModel_1 = __importDefault(require("../mongoose/FollowModel"));
/**
 * @class FollowDao Implements Data Access Object managing data storage
 * of Follows
 * @property {FollowDao} followDao Private single instance of FollowDao
 */
class FollowDao {
    constructor() {
        /**
         * Inserts follow instance into the database
         * @param {string} follower Primary key of the user that is the follower
         * @param {string} following Primary key of the user that the follower is following
         * @returns Promise To be notified when the follow is inserted into the database
         */
        this.userFollowsUser = (follower, following) => __awaiter(this, void 0, void 0, function* () { return FollowModel_1.default.create({ follower, following }); });
        /**
         * Removes follow from the database
         * @param {string} follower Primary key of the user that is unfollowing another user
         * @param {string} following Primary key of the user that the follower is unfollowing
         * @returns Promise To be notified when follow is removed from the database
         */
        this.userUnfollowsUser = (follower, following) => __awaiter(this, void 0, void 0, function* () { return FollowModel_1.default.deleteOne({ follower, following }); });
        /**
         * Uses FollowModel to retrieve all follow documents from follows collection where
         * a given user is being followed (other users are following this user)
         * @param {string} me Primary key of the user that is being followed (other users
         * are following this user)
         * @returns Promise To be notified when follows are retrieved from database
         */
        this.findWhoIsFollowingMe = (me) => __awaiter(this, void 0, void 0, function* () {
            return FollowModel_1.default
                .find({ following: me })
                .populate("follower")
                .exec();
        });
        /**
         * Uses FollowModel to retrieve all follow documents from follows collection where
         * a given user is the follower
         * @param {string} me Primary key of the user that is the follower
         * @returns Promise To be notified when follows are retrieved from database
         */
        this.findWhoIAmFollowing = (me) => __awaiter(this, void 0, void 0, function* () {
            return FollowModel_1.default
                .find({ follower: me })
                .populate("following")
                .exec();
        });
        /**
         * Uses FollowModel to retrieve single follow document from follows collection where
         * me is the follower and user is the one being followed
         * @param {string} me Primary key of the user that is the follower
         * @param {string} user Primary key of the user that the follower is following
         * @returns Promise To be notified when follow is retrieved from the database
         */
        this.findUserIAmFollowing = (me, user) => __awaiter(this, void 0, void 0, function* () {
            return FollowModel_1.default
                .findOne({ follower: me, following: user })
                .populate("following")
                .exec();
        });
        /**
         * Uses FollowModel to retrieve single follow document from follows collection where
         * user is the follower and me is the one being followed
         * @param {string} user Primary key of the user that is the follower
         * @param {string} me Primary key of the user that the follower is following
         * @returns Promise To be notified when follow is retrieved from the database
         */
        this.findUserFollowingMe = (user, me) => __awaiter(this, void 0, void 0, function* () {
            return FollowModel_1.default
                .findOne({ follower: user, following: me })
                .populate("follower")
                .exec();
        });
    }
}
exports.default = FollowDao;
FollowDao.followDao = null;
/**
 * Creates singleton DAO instance
 * @returns FollowDao
 */
FollowDao.getInstance = () => {
    if (FollowDao.followDao === null) {
        FollowDao.followDao = new FollowDao();
    }
    return FollowDao.followDao;
};
//# sourceMappingURL=FollowDao.js.map