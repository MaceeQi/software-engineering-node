/**
 * @file Implements mongoose schema for tuits
 */
import mongoose from "mongoose";

/**
 * @typedef Tuit Represents a tuit
 * @property {string} tuit Body of the tuit
 * @property {Date} postedOn Date the tuit was posted on
 * @property {ObjectId[]} postedBy User that posted the tuit
 */
const TuitSchema = new mongoose.Schema({
    tuit: {type: String, required: true},
    postedOn: {type: Date, default: Date.now},
    // Declares a foreign key to a user's instance stored in the database. It can be replaced with actual instance with populate()
    postedBy: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"}   // Equivalent to join - asking database to fetch object from database and replace this
}, {collection: 'tuits'});      // Store in "tuits" collection
export default TuitSchema;