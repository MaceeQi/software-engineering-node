/**
 * @file Implements mongoose schema for bookmarks
 */
import mongoose, {Schema} from "mongoose";
import Bookmark from "../models/Bookmark";

/**
 * @typedef Bookmark Represents a bookmark - a user bookmarks a tuit
 * @property {ObjectId[]} user User that bookmarked the tuit
 * @property {ObjectId[]} tuit Tuit that is bookmarked by the user
 */
const BookmarkSchema = new mongoose.Schema<Bookmark>({
    user: {type: Schema.Types.ObjectId, ref: "UserModel"},
    tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
}, {collection: "bookmarks"});
export default BookmarkSchema;