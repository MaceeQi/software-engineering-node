/**
 * @file Implements mongoose model to CRUD
 * documents in the bookmarks collection
 */
import BookmarkSchema from "./BookmarkSchema";
import mongoose from "mongoose";

const BookmarkModel = mongoose.model("BookmarkModel", BookmarkSchema);
export default BookmarkModel;