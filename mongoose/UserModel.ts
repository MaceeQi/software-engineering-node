/* Use UserSchema to create a mongoose UserModel to interact with the database */

import mongoose from "mongoose";
import UserSchema from "./UserSchema";
const UserModel = mongoose.model('UserModel', UserSchema);
export default UserModel;