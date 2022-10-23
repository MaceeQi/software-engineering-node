/**
 * @file Declares Tuit data type
 */
import User from "./User";

/**
 * @typedef Tuit Represents a tuit
 * @property {string} tuit Body of the tuit
 * @property {Date} postedOn Date the tuit was posted on
 * @property {User} postedBy User that posted the tuit
 */
export default interface Tuit {
    tuit: string;
    postedOn?: Date;
    postedBy: User;
}