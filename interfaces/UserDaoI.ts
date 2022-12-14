/* Interface that defines the contract the UserDaoI will implement. The interface declares CRUD
operations the DAO must implement
 */

import User from "../models/User";

export default interface UserDaoI {
    findAllUsers(): Promise<User[]>;
    findUserById(uid: string): Promise<User>;
    createUser(user: User): Promise<User>;
    updateUser(uid: string, user: User): Promise<any>;
    deleteUser(uid: string): Promise<any>;
}