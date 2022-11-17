/**
 * @file Implements mongoose schema for likes
 */
import mongoose, {Schema} from "mongoose";
import Like from "../models/Like";

/**
 * @typedef Like Represents a like - a user likes a tuit
 * @property {ObjectId[]} tuit Tuit that was liked by the user
 * @property {ObjectId[]} likedBy User that liked the tuit
 */
const LikeSchema = new mongoose.Schema<Like>({
    tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},      // reference to a tuit
    likedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},   // reference to a user
    type: {type: String, enum: ["LIKED", "DISLIKED"]}
}, {collection: "likes"});
export default LikeSchema;