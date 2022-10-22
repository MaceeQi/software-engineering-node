/**
 * @file Implements mongoose schema for messages
 */
import mongoose, {Schema} from "mongoose";
import Message from "../models/Message";

/**
 * @typedef Message Represents a message between two users
 * @property {string} message Body of the message
 * @property {ObjectId[]} to User that the message is for
 * @property {ObjectId[]} from User that the message is from
 * @property {Date} sentOn Date the message was sent on
 */
const MessageSchema = new mongoose.Schema<Message>({
    message: {type: String, required: true},
    to: {type: Schema.Types.ObjectId, ref: "UserModel"},
    from: {type: Schema.Types.ObjectId, ref: "UserModel"},
    sentOn: {type: Date, default: Date.now},
}, {collection: "messages"});
export default MessageSchema;