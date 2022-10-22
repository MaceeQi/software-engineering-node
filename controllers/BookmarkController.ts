import BookmarkControllerI from "../interfaces/BookmarkControllerI";
import BookmarkDao from "../daos/BookmarkDao";
import {Express, Request, Response} from "express";

export default class BookmarkController implements BookmarkControllerI {
    private static bookmarkDao: BookmarkDao = BookmarkDao.getInstance();
    private static bookmarkController: BookmarkController | null = null;
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

    userBookmarksTuit = async (req: Request, res: Response) => {
        const uid = req.params.uid;
        const tid = req.params.tid;
        const bookmark = await BookmarkController.bookmarkDao.userBookmarksTuit(uid, tid);
        res.json(bookmark);
    }

    userUnbookmarksTuit = async (req: Request, res: Response) => {
        const uid = req.params.uid;
        const tid = req.params.tid;
        const status = await BookmarkController.bookmarkDao.userUnbookmarksTuit(uid, tid);
        res.json(status);
    }

    findAllBookmarkedTuits = async (req: Request, res: Response) => {
        const uid = req.params.uid;
        const tuits = await BookmarkController.bookmarkDao.findAllBookmarkedTuits(uid);
        res.json(tuits);
    }

    findBookmarkedTuit = async (req: Request, res: Response) => {
        const uid = req.params.uid;
        const tid = req.params.tid;
        const tuit = await BookmarkController.bookmarkDao.findBookmarkedTuit(uid, tid);
        res.json(tuit);
    }

    findAllUsersThatBookmarkedTuit = async (req: Request, res: Response) => {
        const tid = req.params.tid;
        const users = await BookmarkController.bookmarkDao.findAllUsersThatBookmarkedTuit(tid);
        res.json(users);
    }
}