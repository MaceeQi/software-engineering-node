/**
 * @file Implements mongoose schema for follows
 */
import mongoose, {Schema} from "mongoose";
import Follow from "../models/Follow";

/**
 * @typedef Follow Represents a follow - a user follows another user
 * @property {ObjectId[]} follower User that is following another user
 * @property {ObjectId[]} following User that the follower is following
 */
const FollowSchema = new mongoose.Schema<Follow>({
    follower: {type: Schema.Types.ObjectId, ref: "UserModel"},
    following: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "follows"});
export default FollowSchema;