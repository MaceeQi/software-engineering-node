/**
 * @file Implements DAO managing data storage of bookmarks. Uses mongoose BookmarkModel
 * to integrate with MongoDB
 */
import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import Bookmark from "../models/Bookmark";
import BookmarkModel from "../mongoose/BookmarkModel";

/**
 * @class BookmarkDao Implements Data Access Object managing data storage
 * of Bookmarks
 * @property {BookmarkDao} bookmarkDao Private single instance of BookmarkDao
 */
export default class BookmarkDao implements BookmarkDaoI {
    private static bookmarkDao: BookmarkDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns BookmarkDao
     */
    public static getInstance = (): BookmarkDao => {
        if(BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }
    private constructor() {}

    /**
     * Inserts bookmark instance into the database
     * @param {string} uid Primary key of the user that bookmarked the tuit
     * @param {string} tid Primary key of the tuit that was bookmarked by user
     * @returns Promise To be notified when bookmark is inserted into the database
     */
    userBookmarksTuit = async (uid: string, tid: string): Promise<Bookmark> =>
        BookmarkModel.create({user: uid, tuit: tid});

    /**
     * Removes bookmark from the database
     * @param {string} uid Primary key of the user that unbookmarked the tuit
     * @param {string} tid Primary key of the tuit that was unbookmarked by user
     * @returns Promise To be notified when bookmark is removed from the database
     */
    userUnbookmarksTuit = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel.deleteOne({user: uid, tuit: tid});

    /**
     * Uses BookmarkModel to retrieve all bookmark documents from bookmarks collection
     * where tuits were bookmarked by a given user
     * @param {string} uid Primary key of the user that bookmarked tuits
     * @returns Promise To be notified when the bookmarks are retrieved from database
     */
    findAllBookmarkedTuits = async (uid: string): Promise<Bookmark[]> =>
        BookmarkModel
            .find({user: uid})
            .populate("tuit")
            .exec();

    /**
     * Uses BookmarkModel to retrieve single bookmark document from bookmarks collection
     * by user ID and tuit ID
     * @param {string} uid Primary key of the user that bookmarked the tuit
     * @param {string} tid Primary key of the tuit that was bookmarked by the user
     * @returns Promise To be notified when bookmark is retrieved from the database
     */
    findBookmarkedTuit = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel
            .findOne({user: uid, tuit: tid})
            .populate("tuit")
            .exec();

    /**
     * Uses BookmarkModel to retrieve all bookmark documents from bookmarks collection
     * where users bookmarked a given tuit
     * @param {string} tid Primary key of the tuit that users bookmarked
     * @returns Promise To be notified when bookmarks are retrieved from database
     */
    findAllUsersThatBookmarkedTuit = async (tid: string): Promise<Bookmark[]> =>
        BookmarkModel
            .find({tuit: tid})
            .populate("user")
            .exec();
}