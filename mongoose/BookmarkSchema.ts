import mongoose, {Schema} from "mongoose";
import Bookmark from "../models/Bookmark";

const BookmarkSchema = new mongoose.Schema<Bookmark>({
    user: {type: Schema.Types.ObjectId, ref: "UserModel"},
    tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
}, {collection: "bookmarks"});
export default BookmarkSchema;