/**
 * @file Declares Follow data type representing relationship between
 * users and users, as in a user follows another user
 */
import User from "./User";

/**
 * @typedef Follow Represents relationship between a user and another user,
 * as in a user follows another user
 * @property {User} follower The user that is following another user
 * @property {User} following The user that is being followed by another user
 */
export default interface Follow {
    follower: User,
    following: User
}