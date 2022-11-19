"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Declares User data type
 */
const AccountType_1 = __importDefault(require("./AccountType"));
const MaritalStatus_1 = __importDefault(require("./MaritalStatus"));
/**
 * @typedef User Represents a user
 * @property {string} id Unique ID of the user
 * @property {string} username Username of the user's account
 * @property {string} password Password for the user's account
 * @property {string} firstName User's first name
 * @property {string} lastName User's last name
 * @property {string} email User's email address
 * @property {string} profilePhoto User's profile photo
 * @property {string} headerImage Header image in user's profile
 * @property {AccountType} accountType User's type of account
 * @property {MaritalStatus} maritalStatus User's marital status
 * @property {string} biography User's biography
 * @property {Date} dateOfBirth User's date of birth
 * @property {Date} joined Date user created an account
 * @property {Location} location User's location
 */
class User {
    /**
     * Instantiates a new User with the given ID, username, password, first name,
     * last name, and email
     * @param {string} id User's unique ID
     * @param {string} username User's username
     * @param {string} password User's password
     * @param {string} firstName User's first name
     * @param {string} lastName User's last name
     * @param {string} email User's email address
     */
    constructor(id, username, password, firstName, lastName, email) {
        this.username = '';
        this.password = '';
        this.firstName = null;
        this.lastName = null;
        this.email = '';
        this.profilePhoto = null;
        this.headerImage = null;
        this.accountType = AccountType_1.default.Personal;
        this.maritalStatus = MaritalStatus_1.default.Single;
        this.biography = null;
        this.dateOfBirth = null;
        this.joined = new Date();
        this.location = null;
        this._id = id;
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }
    setPassword(password) {
        this.password = password;
    }
}
exports.default = User;
//# sourceMappingURL=User.js.map