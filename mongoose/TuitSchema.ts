/* Represent user document instances stored in a MongoDB database */

import mongoose from "mongoose";

const TuitSchema = new mongoose.Schema({
    tuit: {type: String, required: true},
    postedOn: {type: Date, default: Date.now},
    // Declares a foreign key to a user's instance stored in the database. It can be replaced with actual instance with populate()
    postedBy: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"}   // Equivalent to join - asking database to fetch object from database and replace this
}, {collection: 'tuits'});      // Store in "tuits" collection
export default TuitSchema;