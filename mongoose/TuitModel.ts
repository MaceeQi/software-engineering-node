/* Use TuitSchema to create a mongoose TuitModel to interact with the database */

import mongoose from "mongoose";
import TuitSchema from "./TuitSchema";
const TuitModel = mongoose.model('TuitModel', TuitSchema);
export default TuitModel;