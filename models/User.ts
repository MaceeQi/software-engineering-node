/**
 * @file Declares User data type
 */
import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";
import Location from "./Location";

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
export default class User {
    private _id: string;
    private username: string = '';
    private password: string = '';
    private firstName: string | null = null;
    private lastName: string | null = null;
    private email: string = '';
    private profilePhoto: string | null = null;
    private headerImage: string | null = null;
    private accountType: AccountType = AccountType.Personal;
    private maritalStatus: MaritalStatus = MaritalStatus.Single;
    private biography: string | null = null;
    private dateOfBirth: Date | null = null;
    private joined: Date = new Date();
    private location: Location | null = null;

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
    constructor(id: string, username: string, password: string, firstName: string,
                lastName: string, email: string) {
        this._id = id;
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    setPassword (password: string) {
        this.password = password;
    }
}