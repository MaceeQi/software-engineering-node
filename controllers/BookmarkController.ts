/**
 * @file Controller RESTful Web service API for bookmarks resource
 */
import BookmarkControllerI from "../interfaces/BookmarkControllerI";
import BookmarkDao from "../daos/BookmarkDao";
import {Express, Request, Response} from "express";

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
export default class BookmarkController implements BookmarkControllerI {
    private static bookmarkDao: BookmarkDao = BookmarkDao.getInstance();
    private static bookmarkController: BookmarkController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return BookmarkController
     */
    public static getInstance = (app: Express): BookmarkController => {
        if(BookmarkController.bookmarkController === null) {
            BookmarkController.bookmarkController = new BookmarkController();
            app.post("/api/users/:uid/bookmarks/:tid", BookmarkController.bookmarkController.userBookmarksTuit);
            app.delete("/api/users/:uid/unbookmarks/:tid", BookmarkController.bookmarkController.userUnbookmarksTuit);
            app.get("/api/users/:uid/bookmarks", BookmarkController.bookmarkController.findAllBookmarkedTuits);
            app.get("/api/users/:uid/bookmarks/:tid", BookmarkController.bookmarkController.findBookmarkedTuit);
            app.get("/api/tuits/:tid/bookmarks/", BookmarkController.bookmarkController.findAllUsersThatBookmarkedTuit);
        }
        return BookmarkController.bookmarkController;
    }
    private constructor() {}

    /**
     * Creates a new bookmark instance
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is bookmarking
     * the tuit and the tuit being bookmarked
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new bookmark that was inserted in the
     * database
     */
    userBookmarksTuit = async (req: Request, res: Response) => {
        const uid = req.params.uid;
        const tid = req.params.tid;
        const bookmark = await BookmarkController.bookmarkDao.userBookmarksTuit(uid, tid);
        res.json(bookmark);
    }

    /**
     * Removes a bookmark instance from the database
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is unbookmarking
     * the tuit and the tuit being unbookmarked
     * @param {Response} res Represents response to client, including status
     * on whether deleting the bookmark was successful or not
     */
    userUnbookmarksTuit = async (req: Request, res: Response) => {
        const uid = req.params.uid;
        const tid = req.params.tid;
        const status = await BookmarkController.bookmarkDao.userUnbookmarksTuit(uid, tid);
        res.json(status);
    }

    /**
     * Retrieves all tuits bookmarked by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user that bookmarked the tuits
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects that were bookmarked
     */
    findAllBookmarkedTuits = async (req: Request, res: Response) => {
        const uid = req.params.uid;
        const tuits = await BookmarkController.bookmarkDao.findAllBookmarkedTuits(uid);
        res.json(tuits);
    }

    /**
     * Retrieves a tuit bookmarked by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid and tid representing the user that bookmarked the tuit and the
     * tuit that was bookmarked by the user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the tuit that matches the tuit ID and
     * was bookmarked by the given user
     */
    findBookmarkedTuit = async (req: Request, res: Response) => {
        const uid = req.params.uid;
        const tid = req.params.tid;
        const tuit = await BookmarkController.bookmarkDao.findBookmarkedTuit(uid, tid);
        res.json(tuit);
    }

    /**
     * Retrieves all users that bookmarked a tuit from the database
     * @param {Request} req Represents request from client, including the path
     * parameter tid representing the bookmarked tuit
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findAllUsersThatBookmarkedTuit = async (req: Request, res: Response) => {
        const tid = req.params.tid;
        const users = await BookmarkController.bookmarkDao.findAllUsersThatBookmarkedTuit(tid);
        res.json(users);
    }
}