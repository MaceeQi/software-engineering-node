import User from "../models/User";

/**
 * @file Declares API for Users related data access object methods
 */
export default interface UserDaoI {
    findAllUsers (): Promise<User[]>;
    findUserById (uid: string): Promise<User>;
    findUserByUsername (username: string): Promise<any>;
    createUser (user: User): Promise<User>;
    updateUser (uid: string, user: User): Promise<any>;
    deleteUser (uid: string): Promise<any>;
    deleteAllUsers (): Promise<any>;
    deleteUsersByUsername (username: string): Promise<any>;
}