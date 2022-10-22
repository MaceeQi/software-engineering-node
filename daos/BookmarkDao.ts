import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import Bookmark from "../models/Bookmark";
import BookmarkModel from "../mongoose/BookmarkModel";

export default class BookmarkDao implements BookmarkDaoI {
    private static bookmarkDao: BookmarkDao | null = null;
    public static getInstance = (): BookmarkDao => {
        if(BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }
    private constructor() {}

    userBookmarksTuit = async (uid: string, tid: string): Promise<Bookmark> =>
        BookmarkModel.create({user: uid, tuit: tid});

    userUnbookmarksTuit = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel.deleteOne({user: uid, tuit: tid});

    findAllBookmarkedTuits = async (uid: string): Promise<Bookmark[]> =>
        BookmarkModel
            .find({user: uid})
            .populate("tuit")
            .exec();

    findBookmarkedTuit = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel
            .findOne({user: uid, tuit: tid})
            .populate("tuit")
            .exec();

    findAllUsersThatBookmarkedTuit = async (tid: string): Promise<Bookmark[]> =>
        BookmarkModel
            .find({tuit: tid})
            .populate("user")
            .exec();
}