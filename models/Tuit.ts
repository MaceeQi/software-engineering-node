/**
 * @file Declares Tuit data type
 */
import User from "./User";

/**
 * @typedef Tuit Represents a tuit
 * @property {string} id Unique ID of the tuit
 * @property {string} tuit Body of the tuit
 * @property {Date} postedOn Date the tuit was posted on
 * @property {User} postedBy User that posted the tuit
 */
export default class Tuit {
    private id: string;
    private tuit: string;
    private postedOn: Date;
    private postedBy: User | null;

    /**
     * Instantiates a new Tuit with the given ID, tuit, posted on date, and posted by user
     * @param {string} id Unique ID of the tuit
     * @param {string} tuit Body of the tuit
     * @param {Date} postedOn Date the tuit was posted
     * @param {any} postedBy User that posted the tuit
     */
    constructor(id: string, tuit: string, postedOn: Date, postedBy: any) {
        this.id = id;
        this.tuit = tuit;
        this.postedOn = postedOn;
        this.postedBy = postedBy;
    }

    /**
     * Sets the author of the tuit
     * @param {User} user Author of the tuit
     */
    public set author(user: User | null) {
        this.postedBy = user;
    }

    /**
     * Returns the author of the tuit
     */
    public get author(): User | null {
        return this.postedBy;
    }

    /**
     * Returns the body of the tuit
     */
    public get post(): string {
        return this.tuit;
    }
}