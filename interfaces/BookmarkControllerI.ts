import {Request, Response} from "express";

/**
 * @file Declares RESTful Web service API for Bookmarks resource
 */
export default interface BookmarkControllerI {
    userBookmarksTuit (req: Request, res: Response): void;
    userUnbookmarksTuit (req: Request, res: Response): void;
    findAllBookmarkedTuits (req: Request, res: Response): void;
    findBookmarkedTuit (req: Request, res: Response): void;
    findAllUsersThatBookmarkedTuit (req: Request, res: Response): void;
}