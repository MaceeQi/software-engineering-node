/**
 * @file Declares Tuit data type
 */
import User from "./User";

/**
 * @typedef Tuit Represents a tuit
 * @property {string} tuit Body of the tuit
 * @property {Date} postedOn Date the tuit was posted on
 * @property {User} postedBy User that posted the tuit
 * @property {Number} stats.replies Number of replies for the tuit
 * @property {Number} stats.retuits Number of retuits for the tuit
 * @property {Number} stats.likes Number of likes for the tuit
 */
export default interface Tuit {
    tuit: string;
    postedOn?: Date;
    postedBy: User;
    stats: {
        replies: Number,
        retuits: Number,
        likes: Number,
        dislikes: Number
    }
}