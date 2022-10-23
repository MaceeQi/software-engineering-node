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
const BookmarkDao_1 = __importDefault(require("../daos/BookmarkDao"));
/**
 * @class BookmarkController Implements RESTful Web service API for bookmarks resource
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:uid/bookmarks/:tid to create a new bookmark instance</li>
 *     <li>DELETE /api/users/:uid/unbookmarks/:tid to remove a particular bookmark instance</li>
 *     <li>GET /api/users/:uid/bookmarks to retrieve all tuits bookmarked by a given user</li>
 *     <li>GET /api/users/:uid/bookmarks/:tid to retrieve a particular tuit bookmarked by
 *     a given user</li>
 *     <li>GET /api/tuits/:tid/bookmarks/ to retrieve all users that bookmarked a given tuit</li>
 * </ul>
 * @property {BookmarkDao} bookmarkDao Singleton DAO implementing bookmark CRUD operations
 * @property {BookmarkController} bookmarkController Singleton controller implementing
 * RESTful Web service API
 */
class BookmarkController {
    constructor() {
        /**
         * Creates a new bookmark instance
         * @param {Request} req Represents request from client, including the
         * path parameters uid and tid representing the user that is bookmarking
         * the tuit and the tuit being bookmarked
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON containing the new bookmark that was inserted in the
         * database
         */
        this.userBookmarksTuit = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const uid = req.params.uid;
            const tid = req.params.tid;
            const bookmark = yield BookmarkController.bookmarkDao.userBookmarksTuit(uid, tid);
            res.json(bookmark);
        });
        /**
         * Removes a bookmark instance from the database
         * @param {Request} req Represents request from client, including the
         * path parameters uid and tid representing the user that is unbookmarking
         * the tuit and the tuit being unbookmarked
         * @param {Response} res Represents response to client, including status
         * on whether deleting the bookmark was successful or not
         */
        this.userUnbookmarksTuit = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const uid = req.params.uid;
            const tid = req.params.tid;
            const status = yield BookmarkController.bookmarkDao.userUnbookmarksTuit(uid, tid);
            res.json(status);
        });
        /**
         * Retrieves all tuits bookmarked by a user from the database
         * @param {Request} req Represents request from client, including the path
         * parameter uid representing the user that bookmarked the tuits
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the tuit objects that were bookmarked
         */
        this.findAllBookmarkedTuits = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const uid = req.params.uid;
            const tuits = yield BookmarkController.bookmarkDao.findAllBookmarkedTuits(uid);
            res.json(tuits);
        });
        /**
         * Retrieves a tuit bookmarked by a user from the database
         * @param {Request} req Represents request from client, including the path
         * parameter uid and tid representing the user that bookmarked the tuit and the
         * tuit that was bookmarked by the user
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON containing the tuit that matches the tuit ID and
         * was bookmarked by the given user
         */
        this.findBookmarkedTuit = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const uid = req.params.uid;
            const tid = req.params.tid;
            const tuit = yield BookmarkController.bookmarkDao.findBookmarkedTuit(uid, tid);
            res.json(tuit);
        });
        /**
         * Retrieves all users that bookmarked a tuit from the database
         * @param {Request} req Represents request from client, including the path
         * parameter tid representing the bookmarked tuit
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the user objects
         */
        this.findAllUsersThatBookmarkedTuit = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const tid = req.params.tid;
            const users = yield BookmarkController.bookmarkDao.findAllUsersThatBookmarkedTuit(tid);
            res.json(users);
        });
    }
}
exports.default = BookmarkController;
BookmarkController.bookmarkDao = BookmarkDao_1.default.getInstance();
BookmarkController.bookmarkController = null;
/**
 * Creates singleton controller instance
 * @param {Express} app Express instance to declare the RESTful Web service
 * API
 * @return BookmarkController
 */
BookmarkController.getInstance = (app) => {
    if (BookmarkController.bookmarkController === null) {
        BookmarkController.bookmarkController = new BookmarkController();
        app.post("/api/users/:uid/bookmarks/:tid", BookmarkController.bookmarkController.userBookmarksTuit);
        app.delete("/api/users/:uid/unbookmarks/:tid", BookmarkController.bookmarkController.userUnbookmarksTuit);
        app.get("/api/users/:uid/bookmarks", BookmarkController.bookmarkController.findAllBookmarkedTuits);
        app.get("/api/users/:uid/bookmarks/:tid", BookmarkController.bookmarkController.findBookmarkedTuit);
        app.get("/api/tuits/:tid/bookmarks/", BookmarkController.bookmarkController.findAllUsersThatBookmarkedTuit);
    }
    return BookmarkController.bookmarkController;
};
//# sourceMappingURL=BookmarkController.js.map