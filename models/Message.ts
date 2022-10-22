/**
 * @file Declares Message data type representing relationship between
 * users and users, as in a user messages another user
 */
import User from "./User";

/**
 * @typedef Message Represents relationship between a user and another user,
 * as in a user messages another user
 * @property {string} message Message between the two users
 * @property {User} to User that is receiving the message
 * @property {User} from User that is sending the message
 * @property {Date} sentOn Date that the message was sent
 */
export default interface Message {
    message: string,
    to: User,
    from: User,
    sentOn?: Date
}