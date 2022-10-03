/* Represent user document instances stored in a MongoDB database */

import mongoose, {Schema} from "mongoose";

const TuitSchema = new mongoose.Schema({
    tuit: {type: String, required: true},
    postedOn: {type: Date, default: Date.now},      // Automatically sets current date
    // Declares a foreign key to a user's instance stored in the database. It can be replaced with actual instance with populate()
    postedBy: {type: Schema.Types.ObjectId, ref: "UserModel"}
}, {collection: 'tuits'});      // Store in "tuits" collection
export default TuitSchema;