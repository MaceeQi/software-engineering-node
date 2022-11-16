/**
 * @file Implements mongoose schema for tuits
 */
import mongoose from "mongoose";
import Tuit from "../models/Tuit";

/**
 * @typedef Tuit Represents a tuit
 * @property {string} tuit Body of the tuit
 * @property {Date} postedOn Date the tuit was posted on
 * @property {ObjectId[]} postedBy User that posted the tuit
 * @property {Number} stats.replies Number of replies for the tuit, default 0
 * @property {Number} stats.retuits Number of retuits for the tuit, default 0
 * @property {Number} stats.likes Number of likes for the tuit, default 0
 */
const TuitSchema = new mongoose.Schema<Tuit>({
    tuit: {type: String, required: true},
    postedOn: {type: Date, default: Date.now},
    // Declares a foreign key to a user's instance stored in the database. It can be replaced with actual instance with populate()
    postedBy: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"},   // Equivalent to join - asking database to fetch object from database and replace this
    // Initialize tuit's stats attribute
    stats: {
        replies: {type: Number, default: 0},
        retuits: {type: Number, default: 0},
        likes: {type: Number, default: 0}
    }
}, {collection: 'tuits'});      // Store in "tuits" collection
export default TuitSchema;