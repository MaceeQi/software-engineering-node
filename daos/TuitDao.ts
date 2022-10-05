/* Implementation of TuitDaoI interface. Implementation uses mongoose TuitModel */

import Tuit from "../models/Tuit";
import TuitModel from "../mongoose/TuitModel";
import TuitDaoI from "../interfaces/TuitDaoI";

export default class TuitDao implements TuitDaoI {
    // Implement Singleton Design Pattern
    private static tuitDao: TuitDao | null = null;
    public static getInstance = (): TuitDao => {
        if (TuitDao.tuitDao === null) {
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    }
    private constructor() {}

    async findAllTuits(): Promise<Tuit[]> {
        return await TuitModel.find();
    }

    async findTuitsByUser(uid: string): Promise<Tuit[]> {
        return await TuitModel.find({postedBy: uid});
    }

    async findTuitById(tid: string): Promise<any> {
        return await TuitModel.findById(tid);
    }

    async createTuit(tuit: Tuit): Promise<any> {
        return await TuitModel.create(tuit);
    }

    async updateTuit(tid: string, tuit: any): Promise<any> {
        return await TuitModel.updateOne({_id: tid}, {$set:
                {tuit: tuit.tuit, postedOn: tuit.postedOn, postedBy: tuit.postedBy}});
    }

    async deleteTuit(tid: string): Promise<any> {
        return await TuitModel.deleteOne({_id: tid});
    }
}