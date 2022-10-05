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

    public async findAllTuits(): Promise<Tuit[]> {
        const tuitMongooseModels = await TuitModel.find().populate('postedBy', 'username').exec();
        const tuitModels = tuitMongooseModels.map((tuitMongooseModel) => {
                return new Tuit(
                    tuitMongooseModel?._id.toString() ?? '',
                    tuitMongooseModel?.tuit ?? '',
                    new Date(tuitMongooseModel?.postedOn ?? (new Date())),
                    tuitMongooseModel?.postedBy)
            });
        return tuitModels;
    }

    public async findTuitById(tid: string): Promise<Tuit> {
        const tuitMongooseModel = await TuitModel.findById(tid).populate('postedBy', 'username').exec();
        const tuit = new Tuit(
            tuitMongooseModel?._id.toString() ?? '',
            tuitMongooseModel?.tuit ?? '',
            new Date(tuitMongooseModel?.postedOn ?? (new Date())),
            tuitMongooseModel?.postedBy)
        return tuit;
    }

    public async findTuitsByUser(uid: string): Promise<Tuit[]> {
        const tuitMongooseModels = await TuitModel.find({postedBy: uid}).populate('postedBy', 'username').exec();
        const tuitModels = tuitMongooseModels.map((tuitMongooseModel) => {
                return new Tuit(
                    tuitMongooseModel?._id.toString() ?? '',
                    tuitMongooseModel?.tuit ?? '',
                    new Date(tuitMongooseModel?.postedOn ?? (new Date())),
                    tuitMongooseModel?.postedBy)
            });
        return tuitModels;
    }

    public async createTuit(tuit: Tuit): Promise<Tuit> {
        const tuitMongooseModel = await TuitModel.create(tuit);
        return new Tuit(
            tuitMongooseModel?._id.toString() ?? '',
            tuitMongooseModel.tuit,
            new Date(tuitMongooseModel?.postedOn ?? (new Date())),
            tuitMongooseModel?.postedBy
        )
    }

    public async deleteTuit(tid: string): Promise<any> {
        return await TuitModel.deleteOne({_id: tid});
    }

    public async updateTuit(tid: string, tuit: any): Promise<any> {
        return TuitModel.updateOne(
            {_id: tid},
            {$set: {tuit: tuit.tuit, postedOn: tuit.postedOn, postedBy: tuit.postedBy}})
    }



    /*
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

     */
}