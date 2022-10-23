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
const BookmarkModel_1 = __importDefault(require("../mongoose/BookmarkModel"));
/**
 * @class BookmarkDao Implements Data Access Object managing data storage
 * of Bookmarks
 * @property {BookmarkDao} bookmarkDao Private single instance of BookmarkDao
 */
class BookmarkDao {
    constructor() {
        /**
         * Inserts bookmark instance into the database
         * @param {string} uid Primary key of the user that bookmarked the tuit
         * @param {string} tid Primary key of the tuit that was bookmarked by user
         * @returns Promise To be notified when bookmark is inserted into the database
         */
        this.userBookmarksTuit = (uid, tid) => __awaiter(this, void 0, void 0, function* () { return BookmarkModel_1.default.create({ user: uid, tuit: tid }); });
        /**
         * Removes bookmark from the database
         * @param {string} uid Primary key of the user that unbookmarked the tuit
         * @param {string} tid Primary key of the tuit that was unbookmarked by user
         * @returns Promise To be notified when bookmark is removed from the database
         */
        this.userUnbookmarksTuit = (uid, tid) => __awaiter(this, void 0, void 0, function* () { return BookmarkModel_1.default.deleteOne({ user: uid, tuit: tid }); });
        /**
         * Uses BookmarkModel to retrieve all bookmark documents from bookmarks collection
         * where tuits were bookmarked by a given user
         * @param {string} uid Primary key of the user that bookmarked tuits
         * @returns Promise To be notified when the bookmarks are retrieved from database
         */
        this.findAllBookmarkedTuits = (uid) => __awaiter(this, void 0, void 0, function* () {
            return BookmarkModel_1.default
                .find({ user: uid })
                .populate("tuit")
                .exec();
        });
        /**
         * Uses BookmarkModel to retrieve single bookmark document from bookmarks collection
         * by user ID and tuit ID
         * @param {string} uid Primary key of the user that bookmarked the tuit
         * @param {string} tid Primary key of the tuit that was bookmarked by the user
         * @returns Promise To be notified when bookmark is retrieved from the database
         */
        this.findBookmarkedTuit = (uid, tid) => __awaiter(this, void 0, void 0, function* () {
            return BookmarkModel_1.default
                .findOne({ user: uid, tuit: tid })
                .populate("tuit")
                .exec();
        });
        /**
         * Uses BookmarkModel to retrieve all bookmark documents from bookmarks collection
         * where users bookmarked a given tuit
         * @param {string} tid Primary key of the tuit that users bookmarked
         * @returns Promise To be notified when bookmarks are retrieved from database
         */
        this.findAllUsersThatBookmarkedTuit = (tid) => __awaiter(this, void 0, void 0, function* () {
            return BookmarkModel_1.default
                .find({ tuit: tid })
                .populate("user")
                .exec();
        });
    }
}
exports.default = BookmarkDao;
BookmarkDao.bookmarkDao = null;
/**
 * Creates singleton DAO instance
 * @returns BookmarkDao
 */
BookmarkDao.getInstance = () => {
    if (BookmarkDao.bookmarkDao === null) {
        BookmarkDao.bookmarkDao = new BookmarkDao();
    }
    return BookmarkDao.bookmarkDao;
};
//# sourceMappingURL=BookmarkDao.js.map