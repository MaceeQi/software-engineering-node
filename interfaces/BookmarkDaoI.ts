import Bookmark from "../models/Bookmark";

/**
 * @file Declares API for Bookmarks related data access object methods
 */
export default interface BookmarkDaoI {
    userBookmarksTuit (uid: string, tid: string): Promise<Bookmark>;
    userUnbookmarksTuit (uid: string, tid: string): Promise<any>;
    findAllBookmarkedTuits (uid: string): Promise<Bookmark[]>;
    findBookmarkedTuit (uid: string, tid: string): Promise<any>;
    findAllUsersThatBookmarkedTuit (tid: string): Promise<Bookmark[]>;
}