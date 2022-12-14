/* Controller class that implements the TuitControllerI interface using the TuitDaoI to interact
with the database
 */

import {Request, Response, Express} from "express";
import TuitControllerI from "../interfaces/TuitControllerI";
import TuitDaoI from "../interfaces/TuitDaoI";

export default class TuitController implements TuitControllerI {
    // Singleton Design Pattern
    private static tuitController: TuitController | null = null;
    private static tuitDao: TuitDaoI;
    public static getInstance = (app: Express, tuitDao: TuitDaoI): TuitController => {
        if (TuitController.tuitController === null) {
            TuitController.tuitController = new TuitController();
        }
        TuitController.tuitDao = tuitDao;
        app.get('/api/tuits', TuitController.tuitController.findAllTuits);
        app.get('/api/tuits/:tid', TuitController.tuitController.findTuitById);
        app.get('/api/users/:uid/tuits', TuitController.tuitController.findTuitsByUser);
        app.post('/api/tuits', TuitController.tuitController.createTuit);
        app.delete('/api/tuits/:tid', TuitController.tuitController.deleteTuit);
        app.put('/api/tuits/:tid', TuitController.tuitController.updateTuit);

        return TuitController.tuitController;
    }
    private constructor() {}

    findAllTuits = (req: Request, res: Response) =>
        TuitController.tuitDao.findAllTuits().then(tuits => res.json(tuits));

    findTuitById = (req: Request, res: Response) =>
        TuitController.tuitDao.findTuitById(req.params.tid).then(tuit => res.json(tuit));

    findTuitsByUser = (req: Request, res: Response) =>
            TuitController.tuitDao.findTuitsByUser(req.params.uid).then(tuits => res.json(tuits));

    createTuit = (req: Request, res: Response) =>
        TuitController.tuitDao.createTuit(req.body).then(actualTuit => res.json(actualTuit));

    deleteTuit = (req: Request, res: Response) =>
        TuitController.tuitDao.deleteTuit(req.params.tid).then(status => res.json(status));

    updateTuit = (req: Request, res: Response) =>
        TuitController.tuitDao.updateTuit(req.params.tid, req.body).then(status => res.json(status));
}