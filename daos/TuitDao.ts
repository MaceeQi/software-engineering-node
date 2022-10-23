/**
 * @file Implements DAO managing data storage of tuits. Uses mongoose TuitModel
 * to integrate with MongoDB
 */
import Tuit from "../models/Tuit";
import TuitModel from "../mongoose/TuitModel";
import TuitDaoI from "../interfaces/TuitDaoI";

/**
 * @class TuitDao Implements Data Access Object managing data storage
 * of Tuits
 * @property {TuitDao} tuitDao Private single instance of TuitDao
 */
export default class TuitDao implements TuitDaoI {
    private static tuitDao: TuitDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns TuitDao
     */
    public static getInstance = (): TuitDao => {
        if (TuitDao.tuitDao === null) {
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    }
    private constructor() {}

    /**
     * Uses TuitModel to retrieve all tuit documents from tuits collection
     * @returns Promise To be notified when the tuits are retrieved from
     * database
     */
    public async findAllTuits(): Promise<Tuit[]> {
        return await TuitModel.find().populate('postedBy', 'username').exec();
    }

    /**
     * Uses TuitModel to retrieve single tuit document by ID from tuits collection
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when tuit is retrieved from the database
     */
    public async findTuitById(tid: string): Promise<Tuit> {
        return await TuitModel.findById(tid).populate('postedBy', 'username').exec();
    }

    /**
     * Uses TuitModel to retrieve all tuit documents from tuits collection that were posted
     * by a particular user
     * @param {string} uid User's primary key
     * @returns Promise To be notified when tuits are retrieved from the database
     */
    public async findTuitsByUser(uid: string): Promise<Tuit[]> {
        return await TuitModel.find({postedBy: uid}).populate('postedBy', 'username').exec();
    }

    /**
     * Inserts tuit instance into the database
     * @param {Tuit} tuit Instance to be inserted into the database
     * @returns Promise To be notified when tuit is inserted into the database
     */
    public async createTuit(tuit: Tuit): Promise<Tuit> {
        return await TuitModel.create(tuit);
    }

    /**
     * Removes tuit from the database
     * @param {string} tid Primary key of tuit to be removed
     * @returns Promise To be notified when tuit is removed from the database
     */
    public async deleteTuit(tid: string): Promise<any> {
        return await TuitModel.deleteOne({_id: tid});
    }

    /**
     * Updates tuit with new values in database
     * @param {string} tid Primary key of tuit to be modified
     * @param {any} tuit Tuit object containing properties and their new values
     * @returns Promise To be notified when tuit is updated in the database
     */
    public async updateTuit(tid: string, tuit: any): Promise<any> {
        return TuitModel.updateOne(
            {_id: tid},
            {$set: {tuit: tuit.tuit, postedOn: tuit.postedOn, postedBy: tuit.postedBy}})
    }
}