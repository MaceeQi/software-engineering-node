/**
 * @file Declares Like data type representing relationship between
 * users and tuits, as in user likes or dislikes a tuit
 */
import Tuit from "./Tuit";
import User from "./User";
import LikeType from "./LikeType";

/**
 * @typedef Like Represents likes relationship between a user and a tuit,
 * as in a user likes or dislikes a tuit
 * @property {Tuit} tuit Tuit being liked or disliked
 * @property {User} likedBy User liking or disliking the tuit
 * @property {LikeType} type Type of like: like or dislike
 */
export default interface Like {
    tuit: Tuit,
    likedBy: User,
    type: LikeType
};