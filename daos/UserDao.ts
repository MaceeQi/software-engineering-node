/**
 * @file Implements DAO managing data storage of users. Uses mongoose UserModel
 * to integrate with MongoDB
 */
import User from "../models/User";
import UserModel from "../mongoose/UserModel";
import UserDaoI from "../interfaces/UserDaoI";

/**
 * @class UserDao Implements Data Access Object managing data storage
 * of Users
 * @property {UserDao} userDao Private single instance of UserDao
 */
export default class UserDao implements UserDaoI {
    private static userDao: UserDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns UserDao
     */
    public static getInstance = (): UserDao => {
        if(UserDao.userDao === null) {
            UserDao.userDao = new UserDao();
        }
        return UserDao.userDao;
    }
    private constructor() {}

    /**
     * Uses UserModel to retrieve all user documents from users collection
     * @returns Promise To be notified when the users are retrieved from
     * database
     */
    async findAllUsers(): Promise<User[]> {
        const userMongooseModels = await UserModel.find();
        const userModels = userMongooseModels.map((userMongooseModel) => {
            return new User(
                userMongooseModel?._id.toString()??'',
                userMongooseModel?.username??'',
                userMongooseModel?.password??'',
                userMongooseModel?.firstName??'',
                userMongooseModel?.lastName??'',
                userMongooseModel?.email??'',);
        });
        return userModels;
    }

    /**
     * Uses UserModel to retrieve single user document from users collection
     * @param {string} uid User's primary key
     * @returns Promise To be notified when user is retrieved from the database
     */
    async findUserById(uid: string): Promise<User> {
        const userMongooseModel = await UserModel.findById(uid);
        return new User(
            userMongooseModel?._id.toString()??'',
            userMongooseModel?.username??'',
            userMongooseModel?.password??'',
            userMongooseModel?.firstName??'',
            userMongooseModel?.lastName??'',
            userMongooseModel?.email??'',
        );
    }

    /**
     * Uses UserModel to retrieve a single user document from users collection that matches the
     * username
     * @param {string} username User's username
     * @returns Promise To be notified when user is retrieved from the database
     */
    async findUserByUsername(username: string): Promise<any> {
        return await UserModel.findOne({username});
    }

    /**
     * Inserts user instance into the database
     * @param {User} user Instance to be inserted into the database
     * @returns Promise To be notified when user is inserted into the database
     */
    async createUser(user: User): Promise<User> {
        const userMongooseModel = await UserModel.create(user);
        return new User(
            userMongooseModel?._id.toString()??'',
            userMongooseModel?.username??'',
            userMongooseModel?.password??'',
            userMongooseModel?.firstName??'',
            userMongooseModel?.lastName??'',
            userMongooseModel?.email??'',
        );
    }

    /**
     * Removes user from the database
     * @param {string} uid Primary key of user to be removed
     * @returns Promise To be notified when user is removed from the database
     */
    async deleteUser(uid: string): Promise<any> {
        return await UserModel.deleteOne({_id: uid});
    }

    /**
     * Updates user with new values in database
     * @param {string} uid Primary key of user to be modified
     * @param {any} user User object containing properties and their new values
     * @returns Promise To be notified when user is updated in the database
     */
    async updateUser(uid: string, user: any): Promise<any> {
        return await UserModel.updateOne({_id: uid},
            {$set: {username: user.username, password: user.password}});
    }

    /**
     * Removes all users from the database
     * @returns Promise To be notified when all users are removed from the database
     */
    async deleteAllUsers(): Promise<any> {
        return await UserModel.deleteMany({});
    }

    /**
     * Removes user from the database
     * @param {string} username Username of user to be removed
     * @returns Promise To be notified when user is removed from the database
     */
    async deleteUsersByUsername(username: string): Promise<any> {
        return await UserModel.deleteMany({username});
    }
}
