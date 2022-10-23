"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Implements mongoose schema for users
 */
const mongoose_1 = __importDefault(require("mongoose"));
/**
 * @typedef User Represents a user
 * @property {string} username Username of the user's account
 * @property {string} password Password for the user's account
 * @property {string} firstName User's first name
 * @property {string} lastName User's last name
 * @property {string} email User's email address
 * @property {string} profilePhoto User's profile photo
 * @property {string} headerImage Header image in user's profile
 * @property {string} accountType User's type of account
 * @property {string} maritalStatus User's marital status
 * @property {string} biography User's biography
 * @property {Date} dateOfBirth User's date of birth
 * @property {Date} joined Date user created an account
 * @property {number} location User's location
*/
const UserSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    email: String,
    profilePhoto: String,
    headerImage: String,
    accountType: { type: String, default: 'PERSONAL', enum: ['PERSONAL', 'ACADEMIC', 'PROFESSIONAL'] },
    maritalStatus: { type: String, default: 'SINGLE', enum: ['MARRIED', 'SINGLE', 'WIDOWED'] },
    biography: String,
    dateOfBirth: Date,
    joined: { type: Date, default: Date.now },
    location: {
        latitude: { type: Number, default: 0.0 },
        longitude: { type: Number, default: 0.0 },
    }
}, { collection: 'users' });
exports.default = UserSchema;
//# sourceMappingURL=UserSchema.js.map